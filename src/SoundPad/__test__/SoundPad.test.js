import { render, screen } from '@testing-library/react';
import SoundPad from '../SoundPad';

test('renders basic main window text', () => {
  render(<SoundPad />);
  const linkElement = screen.getByText(/Main window/i);
  expect(linkElement).toBeInTheDocument();
});
