import { State } from '../../../types/state';
import { ReducerNode } from '../root-reducer';

export const getCurrentCity = (state: State):string => state[ReducerNode.Logic].currentCity ;
export const getCurrentSort = (state: State):string => state[ReducerNode.Logic].currentSort ;
