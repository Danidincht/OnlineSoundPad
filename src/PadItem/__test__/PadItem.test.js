import { render, screen } from "@testing-library/react";
import PadItem from '../PadItem';

it('should render the PadItem component', () => {
	// Given -  When
	const page = render(<PadItem />).baseElement;

	// Then
	expect(page).toMatchSnapshot();
});