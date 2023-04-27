import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders basic main window text', () => {
  render(<App />);
  const linkElement = screen.getByText(/Main window/i);
  expect(linkElement).toBeInTheDocument();
});
