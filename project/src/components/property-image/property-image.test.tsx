import { render, screen } from '@testing-library/react';
import { makeFakeString } from '../../utils/mock';
import PropertyImage from './property-image';

describe('Component: PropertyImage', () => {

  it('correctly render', () => {
    const fakeString = makeFakeString();
    render( <PropertyImage src={ fakeString }/> );
    expect( screen.getByAltText(/Property Image/i) ).toBeInTheDocument();
  });

});

