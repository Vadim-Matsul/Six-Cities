import { AuthorizationStatus } from '../../../const';
import { makeFakeAuthUser } from '../../../utils/mock';
import { RequireAuth, SetUser } from '../../actions/actions';
import { UserReducer, initialState } from './user-reducer';

describe('Reducer: UserReducer', () => {

  describe('Reducer: authStatus',() => {
    it('should update authStatus to "AUTH"', () => {
      expect( UserReducer(initialState, RequireAuth(AuthorizationStatus.Auth)) )
        .toEqual({...initialState, authStatus: AuthorizationStatus.Auth});
    });

    it('should update authStatus to "NO_AUTH"',() => {
      expect(UserReducer(initialState, RequireAuth(AuthorizationStatus.NoAuth)) )
        .toEqual({...initialState, authStatus: AuthorizationStatus.NoAuth});
    });

  });

  describe('Reducer: user',() => {
    it('the user field should be cleared',() => {
      const fakeUser = makeFakeAuthUser();
      const userState = {
        authStatus: AuthorizationStatus.Auth,
        user: fakeUser
      };
      expect(UserReducer(userState, SetUser(null)))
        .toEqual({...userState, user: null});
    });

    it('the user field should be full',() => {
      const fakeUser = makeFakeAuthUser();
      const userState = {
        authStatus: AuthorizationStatus.NoAuth,
        user: null
      };
      expect(UserReducer(userState, SetUser(fakeUser)))
        .toEqual({...userState, user: fakeUser});
    });

  });

  describe('Reducer: UnKnown',() => {

    it('UserReducer state hasn`t changed by reason of unknown action',() => {
      const UNKNOWN_ACTION = { type:'UNKNOWN_ACTION' };
      expect(UserReducer(void 0, UNKNOWN_ACTION))
        .toEqual({...initialState});
    });

  });

});
