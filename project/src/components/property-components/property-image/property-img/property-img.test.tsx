import { render, screen } from '@testing-library/react';
import PropertyImg from './property-img';

describe('Component: PropertyImg', () => {

  it('sucessfully rendered', () => {
    render(
      <PropertyImg
        src='https://fakeSrc.img'
      />
    );
    expect( screen.getByAltText(/A Great Offer/i) ).toBeInTheDocument();
  });

});
