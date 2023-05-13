import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TemplateName from '../TemplateName';

describe('TemplateName', () => {
  it('it should render the TemplateName component', () => {
	// Given
	const component = (<TemplateName />);
    
	// When
	const page = render(component).baseElement;

	// Then
	expect(page).toMatchSnapshot();
  });
});