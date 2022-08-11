import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../../const';
import { UserState } from '../../../types/state';
import { RequireAuth } from '../../actions/actions';

const initialState:UserState = {
  authStatus: AuthorizationStatus.UnKnown
};

const UserReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(RequireAuth, (state, action) => { state.authStatus = action.payload; });
});


export { UserReducer };
