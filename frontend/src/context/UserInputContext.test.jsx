import { fireEvent, render, screen } from '@testing-library/react';
import { UserInputProvider, useUserInput } from './UserInputContext';

const TestConsumer = () => {
  const { userData, updateUserData } = useUserInput();

  return (
    <>
      <div data-testid="transport-mode">{userData.transport.mode || 'empty'}</div>
      <div data-testid="transport-distance">{userData.transport.dailyDistance || 'empty'}</div>

      <button onClick={() => updateUserData('transport', { mode: 'car' })}>set-mode</button>
      <button onClick={() => updateUserData('transport', { dailyDistance: '15' })}>
        set-distance
      </button>
    </>
  );
};

describe('UserInputContext', () => {
  test('initializes with empty transport values', () => {
    render(
      <UserInputProvider>
        <TestConsumer />
      </UserInputProvider>
    );

    expect(screen.getByTestId('transport-mode')).toHaveTextContent('empty');
    expect(screen.getByTestId('transport-distance')).toHaveTextContent('empty');
  });

  test('merges updates in same category without dropping previous fields', () => {
    render(
      <UserInputProvider>
        <TestConsumer />
      </UserInputProvider>
    );

    fireEvent.click(screen.getByText('set-mode'));
    expect(screen.getByTestId('transport-mode')).toHaveTextContent('car');
    expect(screen.getByTestId('transport-distance')).toHaveTextContent('empty');

    fireEvent.click(screen.getByText('set-distance'));
    expect(screen.getByTestId('transport-mode')).toHaveTextContent('car');
    expect(screen.getByTestId('transport-distance')).toHaveTextContent('15');
  });
});
