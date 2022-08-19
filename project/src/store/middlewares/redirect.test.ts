import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppRoute } from '../../const';
import { State } from '../../types/state';
import { RedirectToPath } from '../actions/actions';
import { redirect } from './redirect';

const fakeBrowserHistory = {
  location:{ path: '' },
  push(somePath:string){
    this.location.path = somePath;
  }
}

const makeFakeStore = configureMockStore< State >( [redirect] ) ;
const store = makeFakeStore() ;
jest.mock('../../browser-history', () => fakeBrowserHistory) ;

describe('Middleware: redirect', () => {

  beforeEach(() => {
    fakeBrowserHistory.location.path = '' ;
    store.clearActions()
  });

  it('store location should be changed to action path', () => {
    const action = RedirectToPath( AppRoute.Auth );
    store.dispatch( action );
    expect(fakeBrowserHistory.location.path).toBe( AppRoute.Auth );
    expect(store.getActions()).toEqual( [action] );
  });

  it('no redirect to path due to unknown action', () => {
    const action = { type: 'UNKNOWN', payload: AppRoute.Favorites };
    store.dispatch( action );
    expect(fakeBrowserHistory.location.path).not.toBe( AppRoute.Favorites );
    expect(store.getActions()).toEqual( [action] );
  });

});
