import { render } from '@testing-library/react';
import SoundPad from '../SoundPad';

it('renders basic main window text', () => {
	// Given - When
	const page = render(<SoundPad />).baseElement;

	// Then
	expect(page).toMatchSnapshot();
});
