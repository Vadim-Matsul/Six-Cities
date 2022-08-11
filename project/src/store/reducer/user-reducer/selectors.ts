import { AuthorizationStatus } from '../../../const';
import { State } from '../../../types/state';
import { ReducerNode } from '../root-reducer';

export const getAuthStatus = ( state: State ):AuthorizationStatus => state[ReducerNode.User].authStatus ;
