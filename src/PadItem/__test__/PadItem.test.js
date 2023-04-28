import { render, screen } from "@testing-library/react";
import PadItem from '../PadItem';

it('should render the PadItem component', () => {
	// Given
	const component = <PadItem />;

	// When
	render(component);

	// Then
	const linkElement = screen.getByText(/This is a PadItem/i);
	expect(linkElement).toBeInTheDocument();
});