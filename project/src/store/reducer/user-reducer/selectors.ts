import { AuthorizationStatus } from '../../../const';
import { State, User } from '../../../types/state';
import { ReducerNode } from '../root-reducer';

export const getAuthStatus = ( state: State ):AuthorizationStatus => state[ReducerNode.User].authStatus ;
export const getUser = (state: State):User | null => state[ReducerNode.User].user ;
