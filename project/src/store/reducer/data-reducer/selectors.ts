import { Offer } from '../../../types/offers';
import { Review } from '../../../types/reviews';
import { State } from '../../../types/state';
import { ReducerNode } from '../root-reducer';

export const getOffers = (state: State):Offer[] => state[ReducerNode.Data].offers ;
export const getLoadStatus = (state: State):boolean => state[ReducerNode.Data].loadStatus ;
export const getNearOffers = (state: State):Offer[] => state[ReducerNode.Data].nearOffers.data ;
export const getReviews = (state: State):Review[] => state[ReducerNode.Data].reviews.data ;
