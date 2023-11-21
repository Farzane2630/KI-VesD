
import '@testing-library/jest-dom';
import Login from './Login';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom';

test("renders Login component", () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
  const loginHeader = screen.getByRole("heading");
  expect(loginHeader).toBeInTheDocument();
});

test("handles login button click", async () => {
  render(<BrowserRouter>
    <Login />
  </BrowserRouter>);
  fireEvent.change(screen.getByPlaceholderText(/Username/i), {
    target: { value: "testuser" },
  });
  fireEvent.change(screen.getByPlaceholderText(/Password/i), {
    target: { value: "testpassword" },
  });
  fireEvent.click(screen.getByRole("button"));

  await waitFor(() => {
    expect(window.location.pathname).toEqual("/");
  });
});
