import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';

import { makeFakeOffer } from '../../utils/mock';

import EmptyFavoritesScreen from './empty-favorites-screen';


const makeFakeStore = configureMockStore();
const store = makeFakeStore({
  DATA:{
    favorites:{
      data: new Array(5).fill(null).map(() => makeFakeOffer())
    }
  }
});

const favorites:number = store.getState().DATA.favorites.data.length;

describe('Component: EmptyFavoritesScreen', () => {

  it('shoudn`t render without favorites data', () => {
    expect(screen.queryByText(/Nothing yet saved/i)).not.toBeInTheDocument();
    if(!favorites){ render( <EmptyFavoritesScreen/> ); }
    expect(screen.queryByText(/Nothing yet saved/i)).not.toBeInTheDocument();
  });

  it('successfully render with favorites data', () => {
    expect(screen.queryByText(/Nothing yet saved/i)).not.toBeInTheDocument();
    if (favorites){ render( <EmptyFavoritesScreen/> ); }
    expect(screen.getByText(/Nothing yet saved/i)).toBeInTheDocument();
  });

});
