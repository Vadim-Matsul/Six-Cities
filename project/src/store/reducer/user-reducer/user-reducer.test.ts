import { AuthorizationStatus } from '../../../const';
import { RequireAuth } from '../../actions/actions';
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

    it('should update authStatus to "UNKNOWN"',() => {
      expect(UserReducer(initialState, RequireAuth(AuthorizationStatus.UnKnown)))
        .toEqual({...initialState, authStatus: AuthorizationStatus.UnKnown});
    });
  });

});