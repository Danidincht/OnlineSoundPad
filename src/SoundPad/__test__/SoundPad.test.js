import { render, screen } from '@testing-library/react';
import SoundPad from '../SoundPad';

it('renders basic main window text', () => {
	// Given
	var element = <SoundPad />;

	// When
	render(element);

	// Then
	const linkElement = screen.getByText(/Main window/i);
	expect(linkElement).toBeInTheDocument();
});
