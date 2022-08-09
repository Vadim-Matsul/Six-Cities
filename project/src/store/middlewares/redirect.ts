import { Middleware } from '@reduxjs/toolkit';
import { browserHistory } from '../../browser-history';
import { ActionsType } from '../actions/actions';


export const redirect:Middleware =
  ( _state) => (dispatch) => (action) => {
    if (action.type === ActionsType.Redirect ){
      browserHistory.push(action.payload);
    }
    return dispatch(action);
  };
