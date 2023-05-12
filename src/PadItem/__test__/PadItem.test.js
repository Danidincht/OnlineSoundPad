import { render } from '@testing-library/react';
import PadItem from '../PadItem';

it('should render the PadItem component', () => {
	// Given
	const component = (<PadItem
		title = 'PadItem title'
		audio = 'audio src'
	/>);

	// When
	const page = render(component).baseElement;

	// Then
	expect(page).toMatchSnapshot();
});