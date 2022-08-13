import { Offer } from '../../../types/offers';
import { Review } from '../../../types/reviews';
import { CombineDataState, State } from '../../../types/state';
import { ReducerNode } from '../root-reducer';

export const getOffers = (state: State):CombineDataState< Offer > => state[ReducerNode.Data].offers ;
export const getNearOffers = (state: State):CombineDataState< Offer > => state[ReducerNode.Data].nearOffers ;
export const getFavorites = (state: State):CombineDataState< Offer > => state[ReducerNode.Data].favorites ;
export const getReviews = (state: State):CombineDataState< Review > => state[ReducerNode.Data].reviews ;
