import { AuthorizationStatus } from '../../../const';
import { State, AuthUser } from '../../../types/state';
import { ReducerNode } from '../root-reducer';

export const getAuthStatus = ( state: State ):AuthorizationStatus => state[ReducerNode.User].authStatus ;
export const getUser = (state: State):AuthUser | null => state[ReducerNode.User].user ;
