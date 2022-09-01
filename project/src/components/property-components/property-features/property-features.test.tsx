import { makeFakeOffer } from "../../../utils/mock";
import { render, screen } from '@testing-library/react';
import { capitalizeFirstLetter } from "../../../utils/utils";
import PropertyFeatures from "./property-features";

const fakeOffer = makeFakeOffer();
const capitalizeType = capitalizeFirstLetter( fakeOffer.type );

describe('Component: PropertyFeatures', () => {

  it('successfully render', () => {
    render(
      <PropertyFeatures
        type={ fakeOffer.type }
        bedrooms={ fakeOffer.bedrooms }
        adults={ fakeOffer.maxAdults }
      />
    );
    expect( screen.getByText(capitalizeType) ).toBeInTheDocument();
    expect( screen.getByText(`${fakeOffer.bedrooms} Bedrooms`) ).toBeInTheDocument();
    expect( screen.getByText(`Max ${fakeOffer.maxAdults} adults`) ).toBeInTheDocument();
  });

});
