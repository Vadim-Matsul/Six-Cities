import { act, renderHook } from '@testing-library/react';

import { makeFakeOffers } from '../utils/mock';
import useHighlighted from './useHighlighted';


const fakeOffers = makeFakeOffers();
const fakeOffer = fakeOffers[0];
const fakeId = fakeOffer['id'];

describe('Hook: useHighlighted', () => {

  it('hook must return an array of 2 elements', () => {
    const { result } = renderHook( () => useHighlighted( fakeOffers ) );
    const [ offer, findOffer ] = result.current;

    expect( result.current ).toHaveLength( 2 );
    expect( result.current ).toBeInstanceOf( Array );
    expect( offer ).toBe( undefined );
    expect( findOffer ).toBeInstanceOf( Function );
  });

  it('The callback from the hook is correctly working', () => {
    const { result } = renderHook( () => useHighlighted( fakeOffers ) );
    let offer = result.current[0];
    const findOffer = result.current[1];

    expect( offer ).toBe( undefined );

    act(() => findOffer( fakeId ));
    [ offer ] = result.current;
    expect( offer ).toBeInstanceOf( Object );
    expect( offer ).toStrictEqual( fakeOffer );

    act(() => findOffer( null ));
    [ offer ] = result.current;
    expect( offer ).toBe( undefined );
  });

});
