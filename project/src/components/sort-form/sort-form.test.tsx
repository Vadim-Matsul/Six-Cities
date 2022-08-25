import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { INITIAL_CURRENT_CITY, SortTypes } from '../../const';
import { HistoryRouter } from '../history-router/history-router';
import SortForm from './sort-form';

const makefakeStore = configureMockStore( [thunk] );
const store = makefakeStore({});

const history = createMemoryHistory();

const sorts = Object.values( SortTypes );
const sort = sorts[0];

describe('Component: SortForm', () => {

  it('correctly render', () => {
    render(
      <Provider store={ store }>
        <HistoryRouter history={ history }>
          <SortForm
            currentCity={ INITIAL_CURRENT_CITY }
            currentSort={ sort }
          />
        </HistoryRouter>
      </Provider>
    );
    expect( screen.getAllByTestId('SortForm-item').length ).toBe( sorts.length );
    expect( screen.getByTestId('SortForm-sortBy').textContent ).toBe('Sort by');
    expect( screen.getByTestId('SortForm-items') ).not.toHaveClass('places__options--opened');
  });

  it('successfully show & hide the form after user Click', async () => {
    render(
      <Provider store={ store }>
        <HistoryRouter history={ history }>
          <SortForm
            currentCity={ INITIAL_CURRENT_CITY }
            currentSort={ sort }
          />
        </HistoryRouter>
      </Provider>
    );
    const sortCase = screen.getByTestId('SortForm-items');
    const sortForm = screen.getByTestId('SortForm-show');

    expect( sortCase ).not.toHaveClass('places__options--opened');
    await UserEvent.click( sortForm );
    expect( sortCase ).toHaveClass('places__options--opened');

    await UserEvent.click( sortForm );
    expect( sortCase ).not.toHaveClass('places__options--opened');
  });

});
