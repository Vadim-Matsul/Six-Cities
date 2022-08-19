import { ChangeCurrentCity, ChangeCurrentSort } from '../../actions/actions';
import { initialState, LogicReducer } from './logic-reducer'

describe('Reducer: LogicReducer', () => {

    it('the city field must be changed', () => {
      expect(LogicReducer(initialState ,ChangeCurrentCity('Some City')) )
        .toEqual({...initialState, currentCity: 'Some City' });
    });

    it('the sort type must be changed',() => {
      expect(LogicReducer(initialState, ChangeCurrentSort('Some Sort')) )
        .toEqual({...initialState, currentSort: 'Some Sort'});
    });

    it('LogicReducer state hasn`t changed by reason of unknown action',() => {
      const UNKNOWN_ACTION = { type:'UNKNOWN_ACTION' };
      expect(LogicReducer(void 0, UNKNOWN_ACTION))
        .toEqual({...initialState});
    });

});