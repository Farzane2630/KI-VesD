import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from './Login';

test('renders login form', () => {
   render(<Login loginInputs={{
      username: '',
      password: ''
   }} />);

   expect(screen.getByLabelText('Username:')).toBeInTheDocument();
   expect(screen.getByLabelText('Password:')).toBeInTheDocument();
   expect(screen.getByRole('button')).toBeInTheDocument();
});

test('handles login with valid credentials', () => {
   render(<Login loginInputs={{
      username: '',
      password: ''
   }} />);

   const passwordInput = screen.getByLabelText('Password:') as HTMLInputElement
   const userInput = screen.getByLabelText('Username:') as HTMLInputElement

   expect(userInput).toBeInTheDocument();
   expect(passwordInput).toBeInTheDocument();

   fireEvent.change(userInput, { target: { value: 'user' } });
   fireEvent.change(passwordInput, { target: { value: 'KiVesd' } })
   fireEvent.click(screen.getByRole('button'));

   expect(passwordInput.value).toBe('KiVesd');
});

test('handles login with empty credentials', () => {
   render(<Login loginInputs={{
      username: '',
      password: ''
   }} />);
});
