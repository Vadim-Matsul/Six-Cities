import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { HistoryRouter } from '../history-router/history-router';
import LocationList from './location-list';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { GeoCity, INITIAL_CURRENT_CITY } from '../../const';

const makeFakeStore = configureMockStore();
const store = makeFakeStore( {} );

const history = createMemoryHistory();

describe('component: LocationList', () => {

  it('successfully render', () => {
    render(
      <Provider store={ store }>
        <HistoryRouter history={ history }>
          <LocationList uniqueCity={ INITIAL_CURRENT_CITY }/>
        </HistoryRouter>
      </Provider>
    );
    expect( screen.getAllByRole('link').length ).toBe( Object.keys(GeoCity).length );
  });

});
