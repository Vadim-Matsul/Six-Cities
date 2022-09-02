import { render, screen } from '@testing-library/react';

import { makeFakeOffer } from '../../utils/mock';
import { BlockClass } from '../../const';

import RaitingBlock from './raiting-block';


const fakeOffer = makeFakeOffer();

describe('Component: RaitingBlock', () => {

  it('successfully render in offerCard & Reviews components', () => {
    render(
      <RaitingBlock
        Raiting={ fakeOffer.rating }
        RaitingClass={ BlockClass.OfferCard }
      />
    );
    expect( screen.getByText(`Rating ${fakeOffer.rating}`) ).toBeInTheDocument();
    expect( screen.queryByTestId('RaitingBlock_forProperty') ).not.toBeInTheDocument();
    expect( screen.queryByTestId('RaitingBlock_forProperty')?.textContent ).not.toBe( fakeOffer.rating );
  });

  it('successfully render in Property component', () => {
    render(
      <RaitingBlock
        Raiting={ fakeOffer.rating }
        RaitingClass={ BlockClass.Property }
      />
    );
    expect( screen.getByText(`Rating ${fakeOffer.rating}`) ).toBeInTheDocument();
    expect( screen.getByTestId('RaitingBlock_forProperty') ).toBeInTheDocument();
    expect( screen.getByTestId('RaitingBlock_forProperty').textContent ).toBe( `${fakeOffer.rating}` );
  });

});
