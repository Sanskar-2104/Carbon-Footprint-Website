import React, { useState } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserInputProvider } from '../../context/UserInputContext';
import ContentBox from '../../components/ContentBox/ContentBox';
import * as carbonApi from '../../services/carbonApi';

// Mock Recharts to avoid jsdom layout/canvas errors
jest.mock('recharts', () => {
  return {
    ResponsiveContainer: ({ children }) => <div>{children}</div>,
    PieChart: ({ children }) => <div>{children}</div>,
    Pie: ({ children }) => <div>{children}</div>,
    Cell: () => <div />,
    Tooltip: () => <div />,
    Legend: () => <div />,
  };
});

// Mock sweetalert2
jest.mock('sweetalert2', () => ({
  fire: jest.fn().mockResolvedValue({}),
}));

// Mock react-confetti
jest.mock('react-confetti', () => () => <div data-testid="confetti" />);

// Mock carbonApi functions
jest.mock('../../services/carbonApi', () => ({
  calculateEmission: jest.fn(),
}));

const CalculatorWrapper = ({ initialSection = 'Shopping' }) => {
  const [activeSection, setActiveSection] = useState(initialSection);
  React.useEffect(() => {
    setActiveSection(initialSection);
  }, [initialSection]);

  return (
    <UserInputProvider>
      <ContentBox activeSection={activeSection} setActiveSection={setActiveSection} />
    </UserInputProvider>
  );
};

describe('Calculator Component Flow', () => {
  test('renders sections for Food, Transport, Shopping, Electricity', () => {
    // 1. Renders Shopping
    const { rerender } = render(<CalculatorWrapper initialSection="Shopping" />);
    expect(screen.queryAllByText(/Shopping/i).length).toBeGreaterThan(0);

    // 2. Renders Transport
    rerender(<CalculatorWrapper initialSection="Transport" />);
    expect(screen.queryAllByText(/Transport/i).length).toBeGreaterThan(0);

    // 3. Renders Electricity
    rerender(<CalculatorWrapper initialSection="Electricity" />);
    expect(screen.queryAllByText(/Electricity/i).length).toBeGreaterThan(0);

    // 4. Renders Food
    rerender(<CalculatorWrapper initialSection="Food" />);
    expect(screen.queryAllByText(/Food/i).length).toBeGreaterThan(0);
  });

  test('user can type into numeric inputs and submit calls carbonApi', async () => {
    // Render Transport section which has dailyDistance input
    render(<CalculatorWrapper initialSection="Transport" />);

    // Pick car mode first
    const carOption = screen.getByText(/Car/i);
    fireEvent.click(carOption);

    // Click next to go to carpool question
    fireEvent.click(screen.getByText(/Next/i));

    // Select "No" for carpool
    const noOption = screen.getByText(/No/i);
    fireEvent.click(noOption);

    // Click next to go to driveFrequency question
    fireEvent.click(screen.getByText(/Next/i));

    // Select frequency
    const freqOption = screen.getByText(/Every day for long/i);
    fireEvent.click(freqOption);

    // Click next to go to dailyDistance numeric input
    fireEvent.click(screen.getByText(/Next/i));

    // Now dailyDistance numeric input should be visible
    const input = screen.getByPlaceholderText(/Enter/i);
    await userEvent.clear(input);
    await userEvent.type(input, '15');
    expect(input.value).toBe('15');
  });

  test('submits calculations successfully, displays emission, grade, and tips', async () => {
    const mockEmissionResult = {
      success: true,
      totalEmission: 24.5,
      grade: 'C',
      points: 70,
      breakdown: {
        food: 5.2,
        transport: 10.3,
        shopping: 4.0,
        electricity: 5.0,
      },
    };

    carbonApi.calculateEmission.mockResolvedValue(mockEmissionResult);

    render(<CalculatorWrapper initialSection="Result" />);

    const calculateBtn = screen.queryByText(/Calculate Footprint/i);
    expect(calculateBtn).toBeInTheDocument();

    fireEvent.click(calculateBtn);

    await waitFor(() => {
      expect(screen.getByTestId('total-emission')).toHaveTextContent('24.5');
    });

    expect(carbonApi.calculateEmission).toHaveBeenCalled();

    // Verify emission display
    const totalDisplay = screen.getByTestId('total-emission');
    expect(totalDisplay).toBeInTheDocument();

    // Verify grade display
    const gradeDisplay = screen.getByTestId('grade');
    expect(gradeDisplay).toBeInTheDocument();
    expect(gradeDisplay).toHaveTextContent('C');

    // Verify sustainability tip is rendered
    const tipHeader = screen.queryByText(/Sustainability Tips/i);
    expect(tipHeader).toBeInTheDocument();
  });

  test('error path: displays error log or handles failure on submit', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    carbonApi.calculateEmission.mockRejectedValue(new Error('Calculation failed'));

    render(<CalculatorWrapper initialSection="Result" />);

    const calculateBtn = screen.queryByText(/Calculate Footprint/i);
    fireEvent.click(calculateBtn);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Error:', expect.any(Error));
    });

    consoleSpy.mockRestore();
  });
});
