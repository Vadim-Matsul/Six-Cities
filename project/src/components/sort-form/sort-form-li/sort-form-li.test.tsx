import React from 'react'
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import SortFormLi from './sort-form-li';

const makeFakeStore = configureMockStore();
const store = makeFakeStore({});
const setMock = jest.fn()


describe('Component: SortFormLi', () => {

  it('successfully render & the li has active class', () => {
    render(
      <Provider store={ store }>
        <SortFormLi
          sort='Popular'
          currentSort='Popular'
          setShow={ setMock }
        />
      </Provider>
    );
    expect( screen.getByTestId('SortForm-item').textContent).toBe('Popular');
    expect( screen.getByTestId('SortForm-item')).toHaveClass('places__option--active');
  });

});
