import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import { AuthorizationStatus, BlockClass } from '../../const';

import BookMarkButton from './bookmark-button';


const makaFakeStore = configureMockStore();
const layout = {
  USER:{
    authStatus: AuthorizationStatus.Auth
  }
};
const store = makaFakeStore(layout);
const isFavorites = !!Math.round( Math.random() );

describe('Component: BookMarkButton', () => {

  it('successfully render', () => {

    render(
      <Provider store={ store }>
        <BookMarkButton
          isFavorite={ isFavorites }
          bookmarkClass={ BlockClass.Property }
          id={ Number(isFavorites) }
        />
      </Provider>
    );
    expect(screen.getByTestId('BookMarkButton')).toBeInTheDocument();
  });

});
