import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import { makeFakeAuthUser, makeFakeOffers } from '../../../../utils/mock';

import HeaderUserInfo from './header-user-info';


const FakeAuthUser = makeFakeAuthUser();
const fakeOffers = makeFakeOffers();
const makeFakeStore = configureMockStore();
const store = makeFakeStore({
  USER:{ user: FakeAuthUser },
  DATA:{ favorites:{ data: fakeOffers } }
});

describe('Component: HeaderUserInfo', () => {

  it('sucessfully rendered', () => {
    render(
      <Provider store={ store }>
        <HeaderUserInfo/>
      </Provider>
    );
    expect( screen.getByText( FakeAuthUser.name ) ).toBeInTheDocument();
    expect( screen.getByText( fakeOffers.length ) ).toBeInTheDocument();
  });

});
