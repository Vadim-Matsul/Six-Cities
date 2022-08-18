import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../../const';
import { UserState } from '../../../types/state';
import { RequireAuth, SetUser } from '../../actions/actions';

export const initialState:UserState = {
  authStatus: AuthorizationStatus.UnKnown,
  user: null
};

const UserReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(RequireAuth, (state, action) => { state.authStatus = action.payload; })
    .addCase(SetUser, (state, action) => { state.user = action.payload; });
});


export { UserReducer };
