import { renderHook } from '@testing-library/react';
import { makeFakeCity } from '../utils/mock';
import useMap from './useMap';

const fakeCity = makeFakeCity();
const makeFakeMutableRefObject = (body: null | HTMLElement) => ({ current: body });

describe('Hook: useMap', () => {

  it('should return null if useRef is empty', () => {
    const fakeMap = makeFakeMutableRefObject( null );
    const { result } = renderHook( () => useMap( fakeMap, fakeCity) );
    const map = result.current;

    expect( map ).toBe(null);
  });

});
