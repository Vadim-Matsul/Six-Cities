import { render, screen } from '@testing-library/react';
import { makeFakeOffer, makeFakeString } from '../../../utils/mock';
import PropertyImage from './property-image';

describe('Component: PropertyImage', () => {

  it('correctly render', () => {
    const fakeOffer = makeFakeOffer();
    render( <PropertyImage Images={ fakeOffer.images }/> );
    expect( screen.getAllByAltText(/Property Image/i).length ).toBe(fakeOffer.images.length);
  });

});

