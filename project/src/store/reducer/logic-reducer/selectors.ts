import { createSelector } from '@reduxjs/toolkit';
import { State } from '../../../types/state';
import { SORT } from '../../../utils/utils';
import { getOffers } from '../data-reducer/selectors';
import { ReducerNode } from '../root-reducer';

export const getCurrentCity = (state: State):string => state[ReducerNode.Logic].currentCity ;
export const getCurrentSort = (state: State):string => state[ReducerNode.Logic].currentSort ;

export const getSortedOffers = createSelector(
  [getOffers, getCurrentSort, getCurrentCity], (offers, sort, city) => {
    const offersOfCity = offers.data.filter((offer) => offer.city.name === city) ;
    return SORT[sort](offersOfCity) ;
  }
);
