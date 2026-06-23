import { render, screen } from '@testing-library/react';
import ContentBox from './ContentBox';

jest.mock('../../pages/Shopping', () => () => <div>Shopping Page</div>);
jest.mock('../../pages/Transport', () => () => <div>Transport Page</div>);
jest.mock('../../pages/Electricity', () => () => <div>Electricity Page</div>);
jest.mock('../../pages/Food', () => () => <div>Food Page</div>);
jest.mock('../../pages/Waste', () => () => <div>Waste Page</div>);
jest.mock('../../pages/Result', () => () => <div>Result Page</div>);

describe('ContentBox', () => {
  test('renders shopping section when activeSection is Shopping', () => {
    render(<ContentBox activeSection="Shopping" setActiveSection={jest.fn()} />);

    expect(screen.getByText('Shopping Page')).toBeInTheDocument();
    expect(screen.queryByText('Transport Page')).not.toBeInTheDocument();
  });

  test('renders electricity section when activeSection is Electricity', () => {
    render(<ContentBox activeSection="Electricity" setActiveSection={jest.fn()} />);

    expect(screen.getByText('Electricity Page')).toBeInTheDocument();
    expect(screen.queryByText('Shopping Page')).not.toBeInTheDocument();
  });

  test('renders transport section when activeSection is Transport', () => {
    render(<ContentBox activeSection="Transport" setActiveSection={jest.fn()} />);

    expect(screen.getByText('Transport Page')).toBeInTheDocument();
  });

  test('renders food section when activeSection is Food', () => {
    render(<ContentBox activeSection="Food" setActiveSection={jest.fn()} />);

    expect(screen.getByText('Food Page')).toBeInTheDocument();
  });

  test('renders result section when activeSection is Result', () => {
    render(<ContentBox activeSection="Result" setActiveSection={jest.fn()} />);

    expect(screen.getByText('Result Page')).toBeInTheDocument();
  });

  test('renders waste section when activeSection is Waste', () => {
    render(<ContentBox activeSection="Waste" setActiveSection={jest.fn()} />);

    expect(screen.getByText('Waste Page')).toBeInTheDocument();
  });

  test('renders no section content for unsupported activeSection', () => {
    render(<ContentBox activeSection="UnsupportedSection" setActiveSection={jest.fn()} />);

    expect(screen.queryByText(/Page$/)).not.toBeInTheDocument();
  });
});
