import { Offer } from '../../../types/offers';
import { State } from '../../../types/state';
import { ReducerNode } from '../root-reducer';

export const getOffers = (state: State):Offer[] => state[ReducerNode.Data].offers ;
export const getLoadStatus = (state: State):boolean => state[ReducerNode.Data].loadStatus ;
