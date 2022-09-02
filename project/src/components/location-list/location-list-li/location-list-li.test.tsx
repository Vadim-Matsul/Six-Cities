import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeCity, makeFakeString } from '../../../utils/mock';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import LocationListLi from './location-list-li';

const makeFakeStore = configureMockStore();
const store = makeFakeStore({});

describe('Component: LocationListLi', () => {

  it('successfully render', () => {
    const city = makeFakeCity().name;
    const uniqueCity = makeFakeString();
    render(
      <Provider store={ store }>
        <LocationListLi
          city={ city }
          uniqueCity={ uniqueCity }
        />
      </Provider>
    );
    expect( screen.getByRole('link') ).not.toHaveClass('tabs__item--active');
    expect( screen.getByTestId('LocationListLi_span').textContent ).toBe( city );
  });

  it('the active city has active class', () => {
    const city = makeFakeCity().name;
    render(
      <Provider store={ store }>
        <LocationListLi
          city={ city }
          uniqueCity={ city }
        />
      </Provider>
    );
    expect( screen.getByRole('link') ).toHaveClass('tabs__item--active');
  });

});
