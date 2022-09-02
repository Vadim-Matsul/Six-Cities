import { RequireAuth, SetloginError, SetLogoutError, SetLogOutProcess, SetReviewError, SetUser } from '../../actions/actions';
import { AuthorizationStatus } from '../../../const';
import { createReducer } from '@reduxjs/toolkit';
import { UserState } from '../../../types/state';


export const initialState:UserState = {
  authStatus: AuthorizationStatus.UnKnown,
  user: null,
  logoutProcess: false,
  logoutError: false,
  loginError: false,
  reviewError: false
};

const UserReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(RequireAuth, (state, action) => { state.authStatus = action.payload; })
    .addCase(SetUser, (state, action) => { state.user = action.payload; })
    .addCase(SetLogoutError, (state, action) => { state.logoutError = action.payload; } )
    .addCase(SetLogOutProcess, (state, action) => { state.logoutProcess = action.payload; } )
    .addCase(SetloginError, (state, action) => { state.loginError = action.payload; } )
    .addCase(SetReviewError, (state, action) => { state.reviewError = action.payload; } );
});


export { UserReducer };
