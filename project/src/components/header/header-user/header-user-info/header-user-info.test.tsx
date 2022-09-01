import { makeFakeAuthUser, makeFakeOffers } from "../../../../utils/mock";
import { render, screen } from '@testing-library/react';
import { configureMockStore } from "@jedmao/redux-mock-store";
import { Provider } from "react-redux";
import HeaderUserInfo from "./header-user-info";

const FakeAuthUser = makeFakeAuthUser();
const fakeOffers = makeFakeOffers();
const makeFakeStore = configureMockStore();
const store = makeFakeStore({
  USER:{ user: FakeAuthUser },
  DATA:{ favorites:{ data: fakeOffers } }
})

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
