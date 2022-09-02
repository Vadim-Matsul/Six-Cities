import { render, screen } from '@testing-library/react';

import { makeFakeOffer } from '../../../utils/mock';

import PropertyImage from './property-image';

describe('Component: PropertyImage', () => {

  it('correctly render', () => {
    const fakeOffer = makeFakeOffer();
    render( <PropertyImage Images={ fakeOffer.images }/> );
    expect( screen.getAllByAltText(/A Great Offer/i).length ).toBe(fakeOffer.images.length);
  });

});

