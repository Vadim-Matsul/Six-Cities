import { Middleware } from '@reduxjs/toolkit';
import browserHistory from '../../browser-history';
import { State } from '../../types/state';
import { ActionsType } from '../actions/actions';
import { Dispatch } from 'redux';

export const redirect:Middleware<unknown, State, Dispatch> =
  ( _state) => (dispatch) => (action) => {
    if (action.type === ActionsType.Redirect ){
      browserHistory.push(action.payload);
    }
    return dispatch(action);
  };
