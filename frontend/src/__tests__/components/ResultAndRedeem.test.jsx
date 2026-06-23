import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { UserInputProvider } from '../../context/UserInputContext';
import Result from '../../pages/Result';
import Redeem from '../../pages/Redeem/Redeem';
import { calculateEmission } from '../../services/carbonApi';

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

// Mock carbonApi
jest.mock('../../services/carbonApi', () => ({
  calculateEmission: jest.fn(),
}));

// Mock window.alert to prevent blocking test runs
const originalAlert = window.alert;
beforeAll(() => {
  window.alert = jest.fn();
});
afterAll(() => {
  window.alert = originalAlert;
});

describe('Result Component', () => {
  beforeEach(() => {
    localStorage.setItem('token', 'fake-token');
  });

  afterEach(() => {
    localStorage.clear();
  });

  test('displays totalEmission, grade, points, tips list, and per-category breakdown after successful calculation', async () => {
    const mockEmissionResult = {
      success: true,
      totalEmission: 24.5,
      grade: 'C',
      points: 75,
      breakdown: {
        food: 5.2,
        transport: 10.3,
        shopping: 4.0,
        electricity: 5.0,
      },
    };
    calculateEmission.mockResolvedValue(mockEmissionResult);

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
      }),
    });

    render(
      <UserInputProvider>
        <Result />
      </UserInputProvider>
    );

    const calculateBtn = screen.getByText(/Calculate Footprint/i);
    expect(calculateBtn).toBeInTheDocument();
    fireEvent.click(calculateBtn);

    // Wait for response to be loaded and rendered
    await waitFor(() => {
      expect(screen.getByTestId('total-emission')).toHaveTextContent('24.5');
    });

    // Check grade
    expect(screen.getByTestId('grade')).toHaveTextContent('C');

    // Check points
    expect(screen.getByText(/Points: 75/i)).toBeInTheDocument();

    // Check breakdown
    const listItems = screen.getAllByRole('listitem');
    expect(
      listItems.some(
        (item) => item.textContent.includes('Transport') && item.textContent.includes('10.3')
      )
    ).toBe(true);
    expect(
      listItems.some(
        (item) => item.textContent.includes('Electricity') && item.textContent.includes('5')
      )
    ).toBe(true);
    expect(
      listItems.some(
        (item) => item.textContent.includes('Food') && item.textContent.includes('5.2')
      )
    ).toBe(true);
    expect(
      listItems.some(
        (item) => item.textContent.includes('Shopping') && item.textContent.includes('4')
      )
    ).toBe(true);

    // Check tips list
    expect(screen.getByText(/🌱 Sustainability Tips/i)).toBeInTheDocument();
  });
});

describe('Redeem Component', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
    localStorage.setItem('token', 'fake-token');
    jest.clearAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
  });

  test("displays user's available points and renders all reward items with their cost", async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, points: 3200 }),
    });

    render(<Redeem />);

    // Wait for points fetching to complete
    await waitFor(() => {
      expect(screen.getByText('3200')).toBeInTheDocument();
    });

    // Check reward items costs
    expect(screen.getByText('3000 points')).toBeInTheDocument(); // Eco Shopping Voucher
    expect(screen.getByText('4100 points')).toBeInTheDocument(); // Tree Planting Donation
    expect(screen.getByText('3500 points')).toBeInTheDocument(); // Zero Waste Kit
    expect(screen.getByText('2500 points')).toBeInTheDocument(); // Public Transport Pass
  });

  test('redeem button is enabled when userPoints >= rewardCost and disabled when userPoints < rewardCost', async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, points: 3200 }), // 3200 points
    });

    render(<Redeem />);

    await waitFor(() => {
      expect(screen.getByText('3200')).toBeInTheDocument();
    });

    // Eco Shopping Voucher (3000 pts) - Should be enabled
    const ecoVoucherBtn = screen.getAllByRole('button', { name: /Redeem/i })[0];
    expect(ecoVoucherBtn).not.toBeDisabled();

    // Tree Planting Donation (4100 pts) - Should be disabled
    const treeDonationBtn = screen.getAllByRole('button', { name: /Redeem/i })[1];
    expect(treeDonationBtn).toBeDisabled();
  });

  test('calls onRedeem callback with correct reward object on button click', async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, points: 5000 }), // plenty of points
    });

    const mockOnRedeem = jest.fn();

    render(<Redeem onRedeem={mockOnRedeem} />);

    await waitFor(() => {
      expect(screen.getByText('5000')).toBeInTheDocument();
    });

    const ecoVoucherBtn = screen.getAllByRole('button', { name: /Redeem/i })[0];
    fireEvent.click(ecoVoucherBtn);

    expect(mockOnRedeem).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Eco Shopping Voucher',
        points: 3000,
      })
    );
  });
});
