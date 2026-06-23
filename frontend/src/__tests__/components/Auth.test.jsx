import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AuthPage from '../../pages/Auth/LoginSignup';
import Swal from 'sweetalert2';
import { BrowserRouter } from 'react-router-dom';

// Mock sweetalert2
jest.mock('sweetalert2', () => ({
  fire: jest.fn().mockResolvedValue({}),
}));

describe('AuthPage Component', () => {
  let originalFetch;

  beforeAll(() => {
    originalFetch = global.fetch;
  });

  afterAll(() => {
    global.fetch = originalFetch;
  });

  beforeEach(() => {
    global.fetch = jest.fn();
    jest.clearAllMocks();
  });

  const getSignUpOverlayBtn = () => {
    const buttons = screen.queryAllByRole('button', { name: /Sign Up/i });
    return buttons.find((b) => b.classList.contains('ghost'));
  };

  const getSignUpSubmitBtn = () => {
    const buttons = screen.queryAllByRole('button', { name: /Sign Up/i });
    return buttons.find((b) => b.classList.contains('ghostBtn'));
  };

  describe('Login Form', () => {
    test('renders email input, password input, submit button, and link to register', () => {
      render(
        <BrowserRouter>
          <AuthPage />
        </BrowserRouter>
      );

      // Under sign-in container
      const emailInputs = screen.queryAllByPlaceholderText(/Email/i);
      expect(emailInputs.length).toBeGreaterThan(0);

      const passwordInputs = screen.queryAllByPlaceholderText(/Password/i);
      expect(passwordInputs.length).toBeGreaterThan(0);

      const signInButtons = screen.queryAllByRole('button', { name: /Sign In/i });
      expect(signInButtons.length).toBeGreaterThan(0);

      const signUpOverlayBtn = getSignUpOverlayBtn();
      expect(signUpOverlayBtn).toBeInTheDocument();
    });

    test('calls login API with correct email on submit', async () => {
      global.fetch.mockResolvedValue({
        ok: true,
        json: async () => ({ success: true, token: 'fake-token' }),
      });

      render(
        <BrowserRouter>
          <AuthPage />
        </BrowserRouter>
      );

      // Fill in Sign In form
      const emailInput = screen.queryAllByPlaceholderText(/Email/i)[1]; // Second input is in Sign In
      const passwordInput = screen.queryAllByPlaceholderText(/Password/i)[1];
      const submitBtn = screen.queryAllByRole('button', { name: /Sign In/i })[0];

      await userEvent.type(emailInput, 'login@example.com');
      await userEvent.type(passwordInput, 'password123');
      fireEvent.click(submitBtn);

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          expect.stringContaining('/api/auth/login'),
          expect.objectContaining({
            method: 'POST',
            body: expect.stringContaining('login@example.com'),
          })
        );
      });
    });

    test('displays API error message on failed login', async () => {
      global.fetch.mockResolvedValue({
        ok: false,
        json: async () => ({ success: false, message: 'Invalid credentials' }),
      });

      render(
        <BrowserRouter>
          <AuthPage />
        </BrowserRouter>
      );

      const emailInput = screen.queryAllByPlaceholderText(/Email/i)[1];
      const passwordInput = screen.queryAllByPlaceholderText(/Password/i)[1];
      const submitBtn = screen.queryAllByRole('button', { name: /Sign In/i })[0];

      await userEvent.type(emailInput, 'login@example.com');
      await userEvent.type(passwordInput, 'wrong-password');
      fireEvent.click(submitBtn);

      await waitFor(() => {
        expect(Swal.fire).toHaveBeenCalledWith(
          expect.objectContaining({
            icon: 'error',
            title: 'Invalid credentials',
          })
        );
      });
    });
  });

  describe('Register Form', () => {
    test('renders name, email, password inputs and submit button', () => {
      // Toggle to registration panel by clicking overlay Sign Up button
      render(
        <BrowserRouter>
          <AuthPage />
        </BrowserRouter>
      );

      const signUpOverlayBtn = getSignUpOverlayBtn();
      if (signUpOverlayBtn) {
        fireEvent.click(signUpOverlayBtn);
      }

      const nameInput = screen.queryByPlaceholderText(/Name/i);
      expect(nameInput).toBeInTheDocument();

      const emailInput = screen.queryAllByPlaceholderText(/Email/i)[0]; // First input is in Sign Up
      expect(emailInput).toBeInTheDocument();

      const passwordInput = screen.queryAllByPlaceholderText(/Password/i)[0];
      expect(passwordInput).toBeInTheDocument();

      const signUpSubmitBtn = getSignUpSubmitBtn();
      expect(signUpSubmitBtn).toBeInTheDocument();
    });

    test('calls register API with correct data on submit', async () => {
      global.fetch.mockResolvedValue({
        ok: true,
        json: async () => ({ success: true, message: 'Registered!' }),
      });

      render(
        <BrowserRouter>
          <AuthPage />
        </BrowserRouter>
      );

      // Switch to register panel
      const signUpOverlayBtn = getSignUpOverlayBtn();
      if (signUpOverlayBtn) {
        fireEvent.click(signUpOverlayBtn);
      }

      const nameInput = screen.queryByPlaceholderText(/Name/i);
      const emailInput = screen.queryAllByPlaceholderText(/Email/i)[0];
      const passwordInput = screen.queryAllByPlaceholderText(/Password/i)[0];
      const submitBtn = getSignUpSubmitBtn();

      await userEvent.type(nameInput, 'New User');
      await userEvent.type(emailInput, 'new@example.com');
      await userEvent.type(passwordInput, 'password123');
      fireEvent.click(submitBtn);

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          expect.stringContaining('/api/auth/register'),
          expect.objectContaining({
            method: 'POST',
            body: expect.stringContaining('new@example.com'),
          })
        );
      });
    });

    test('error path: displays alert on register failure', async () => {
      global.fetch.mockResolvedValue({
        ok: false,
        json: async () => ({ success: false, message: 'Email already exists' }),
      });

      render(
        <BrowserRouter>
          <AuthPage />
        </BrowserRouter>
      );

      // Switch to register panel
      const signUpOverlayBtn = getSignUpOverlayBtn();
      if (signUpOverlayBtn) {
        fireEvent.click(signUpOverlayBtn);
      }

      const nameInput = screen.queryByPlaceholderText(/Name/i);
      const emailInput = screen.queryAllByPlaceholderText(/Email/i)[0];
      const passwordInput = screen.queryAllByPlaceholderText(/Password/i)[0];
      const submitBtn = getSignUpSubmitBtn();

      await userEvent.type(nameInput, 'Existing User');
      await userEvent.type(emailInput, 'existing@example.com');
      await userEvent.type(passwordInput, 'password123');
      fireEvent.click(submitBtn);

      await waitFor(() => {
        expect(Swal.fire).toHaveBeenCalledWith(
          expect.objectContaining({
            icon: 'error',
            title: 'Email already exists',
          })
        );
      });
    });
  });
});
