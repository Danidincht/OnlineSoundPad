import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PadEditor from '../PadEditor';

describe('PadEditor', () => {
  it('it should render the PadEditor component', () => {
	// Given
	const component = (<PadEditor />);
    
	// When
	const page = render(component).baseElement;

	// Then
	expect(page).toMatchSnapshot();
  });
});