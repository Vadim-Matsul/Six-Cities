import { FetchProgress } from '../../../const';
import { makeFakeOffers, makeFakeReviews } from '../../../utils/mock';
import { ChangeFavorites, ChangeNearOffers, ChangeOffers, ChangeReviews } from '../../actions/actions';
import { initialState } from '../data-reducer/data-reducer';
import { DataReducer } from './data-reducer';

const fakeOffers = makeFakeOffers();
const fakeReviews = makeFakeReviews();
const fakeId = fakeOffers[0]['id'];


describe('Reducer: DataReducer', () => {

  it('shouldn`t change state by reason of unknown action', () => {
    const FakeAction = {type: 'UnKnown', payload: {}};
    expect( DataReducer( initialState, FakeAction))
      .toEqual({...initialState});
  });

  describe('Action: ChangeOffers', () => {

    it('succesfull change data & loadStatus fields', () => {
      expect( DataReducer( initialState, ChangeOffers({data: fakeOffers, loadStatus: FetchProgress.Fulfilled}) ) )
        .toEqual(
          {...initialState,
            offers: {
              data: fakeOffers,
              loadStatus: FetchProgress.Fulfilled
            }
          });
    });

  });

  describe('Action: ChangeFavorites', () => {

    it('succesfull change data & loadStatus fields', () => {
      expect( DataReducer( initialState, ChangeFavorites({data: fakeOffers, loadStatus: FetchProgress.Fulfilled}) ) )
        .toEqual(
          {...initialState,
            favorites: {
              data: fakeOffers,
              loadStatus: FetchProgress.Fulfilled
            }
          });
    });

  });

  describe('Action: ChangeNearOffers', () => {

    it('successfully change id & data & loadStatus fields', () => {
      const nearoffers = fakeOffers.slice(0,3);
      expect( DataReducer( initialState, ChangeNearOffers(
        {id: fakeId, data: nearoffers, loadStatus: FetchProgress.Fulfilled }) )
      ).toEqual({
        ...initialState,
        nearOffers: {
          id: fakeId,
          data: nearoffers,
          loadStatus: FetchProgress.Fulfilled
        }
      });

    });

  });

  describe('Action: ChangeReviews', () => {

    it('successfully change id & data & loadstatus fields', () => {
      expect( DataReducer( initialState, ChangeReviews(
        {id: fakeId, data: fakeReviews, loadStatus: FetchProgress.Fulfilled}) )
      ).toEqual({
        ...initialState,
        reviews: {
          id: fakeId,
          data: fakeReviews,
          loadStatus: FetchProgress.Fulfilled
        }
      });
    });

  });

});
