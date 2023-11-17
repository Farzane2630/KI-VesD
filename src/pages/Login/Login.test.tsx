
import '@testing-library/jest-dom';
import Login from './Login';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

test("renders Login component", () => {
  render(<Login />);
  const loginHeader = screen.getByText(/Login/i);
  expect(loginHeader).toBeInTheDocument();
});

test("handles login button click", async () => {
  render(<Login />);
  fireEvent.change(screen.getByPlaceholderText(/Username/i), {
    target: { value: "testuser" },
  });
  fireEvent.change(screen.getByPlaceholderText(/Password/i), {
    target: { value: "testpassword" },
  });
  fireEvent.click(screen.getByText(/Login/i));

  await waitFor(() => {
    expect(window.location.pathname).toBe("/dashboard");
  });
});
