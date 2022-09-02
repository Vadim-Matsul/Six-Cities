import { RequireAuth, SetLogoutError, SetLogOutProcess, SetUser } from '../../actions/actions';
import { UserReducer, initialState } from './user-reducer';
import { makeFakeAuthUser } from '../../../utils/mock';
import { AuthorizationStatus } from '../../../const';


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
    const fakeUser = makeFakeAuthUser();
    const createLayout = (
      authStatus: AuthorizationStatus,
      logoutProcess: boolean,
      logoutError: boolean ) => ({
      authStatus: authStatus,
      user: fakeUser,
      logoutProcess: logoutProcess,
      logoutError: logoutError,
      loginError: false,
      reviewError: false
    });

    it('the user field should be cleared',() => {
      const userState = createLayout(AuthorizationStatus.Auth, false, false);
      expect(UserReducer(userState, SetUser(null)))
        .toEqual({...userState, user: null});
    });

    it('the user field should be full',() => {
      const userState = createLayout(AuthorizationStatus.NoAuth, false, false);
      expect(UserReducer(userState, SetUser(fakeUser)))
        .toEqual({...userState, user: fakeUser});
    });

    it('should change logoutError flag to "true"', () => {
      const userState = createLayout(AuthorizationStatus.Auth, false, false);
      expect( UserReducer( userState, SetLogoutError( true )) ).toEqual(
        {...userState, logoutError: true});
    });

    it('should change logoutProcess flag to "true"', () => {
      const userState = createLayout(AuthorizationStatus.Auth, false, false);
      expect( UserReducer( userState, SetLogOutProcess( true )) ).toEqual(
        {...userState, logoutProcess: true});
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
