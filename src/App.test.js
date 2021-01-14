import { render, screen } from '@testing-library/react';
import App from './App';

test('Download button is disabled when nothing is checked', () => {
  render(<App />);
  const button = screen.getByRole("button");
  expect(button).toHaveAttribute('disabled');
});

