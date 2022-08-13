import { Offer } from '../../../types/offers';
import { Review } from '../../../types/reviews';
import { CombineDataState, State } from '../../../types/state';
import { ReducerNode } from '../root-reducer';

export const getOffers = (state: State):CombineDataState< Offer > => state[ReducerNode.Data].offers ;
export const getNearOffers = (state: State):CombineDataState< Offer > => state[ReducerNode.Data].nearOffers ;
export const getReviews = (state: State):CombineDataState< Review > => state[ReducerNode.Data].reviews ;
export const getActualId = (state: State) => [state[ReducerNode.Data].nearOffers.id, state[ReducerNode.Data].reviews.id ] ;
export const getActualStatus = (state: State) => [state[ReducerNode.Data].nearOffers.loadStatus, state[ReducerNode.Data].reviews.loadStatus ] ;
