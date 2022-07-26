import { State, AuthUser } from '../../../types/state';
import { AuthorizationStatus } from '../../../const';
import { ReducerNode } from '../root-reducer';


export const getAuthStatus = ( state: State ):AuthorizationStatus => state[ReducerNode.User].authStatus ;
export const getUser = (state: State):AuthUser | null => state[ReducerNode.User].user ;
export const getLogoutError = (state: State):boolean => state[ReducerNode.User].logoutError ;
export const getLoginError = (state: State):boolean => state[ReducerNode.User].loginError ;
export const getReviewError = (state: State):boolean => state[ReducerNode.User].reviewError ;
export const getLogoutProcess = (state: State):boolean => state[ReducerNode.User].logoutProcess ;

