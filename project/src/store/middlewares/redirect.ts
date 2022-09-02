import { Middleware } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';

import { ActionsType } from '../actions/actions';
import { State } from '../../types/state';

import browserHistory from '../../browser-history';


export const redirect:Middleware<unknown, State, Dispatch> =
  ( _state) => (dispatch) => (action) => {
    if (action.type === ActionsType.Redirect ){
      browserHistory.push(action.payload);
    }
    return dispatch(action);
  };
