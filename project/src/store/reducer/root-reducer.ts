import { combineReducers } from '@reduxjs/toolkit';
import { DataReducer } from './data-reducer/data-reducer';
import { LogicReducer } from './logic-reducer/logic-reducer';
import { UserReducer } from './user-reducer/user-reducer';

enum ReducerNode {
  Data = 'DATA',
  Logic = 'LOGIC',
  User = 'USER'
}

export const RootReducer = combineReducers({
  [ReducerNode.Data] : DataReducer,
  [ReducerNode.Logic] : LogicReducer,
  [ReducerNode.User] : UserReducer
});

export type RootReducerState = ReturnType<typeof RootReducer>
