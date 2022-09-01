import type { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { ChangeOffers, ChangeReviews, ChangeNearOffers, RedirectToPath, RequireAuth, ChangeFavorites, SetUser, SetLogoutError, SetLogOutProcess, SetloginError, SetReviewError, ChangeOffer } from './actions';
import { APIRoute, AppRoute, AuthorizationStatus, FavoritesConfig, FetchProgress } from '../../const';
import { dropToken, saveToken } from '../../service/token/token';
import { Review, ReviewState } from '../../types/reviews';
import { Offer, Offers } from '../../types/offers';
import { clearSession, getActualArr } from '../../utils/utils';
import { State, AuthUser } from '../../types/state';
import { generatePath } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AxiosInstance } from 'axios';
import { Action } from 'redux';

export type ThunkActionResualt<R = Promise<void>> = ThunkAction< R, State, AxiosInstance, Action>
export type ThunkDispatchResualt = ThunkDispatch< State, AxiosInstance, Action >
export type AuthData = { email: string, password: string }

const { Fulfilled, Rejected, Pending, Idle} = FetchProgress;
const { Auth, NoAuth } = AuthorizationStatus;


const fetchOffers = ():ThunkActionResualt =>
  async (dispatch, _getState, api) => {
    dispatch( ChangeOffers({data: [], loadStatus: Pending}) );
    await api.get<Offers>(APIRoute.Offers)
      .then(({data}) => {
        const favorites = data.slice().filter( (offer) => offer.isFavorite );
        dispatch(ChangeFavorites({data: favorites, loadStatus: Fulfilled}) );
        dispatch(ChangeOffers({data, loadStatus: Fulfilled}));
      })
      .catch((err: Error) => {
        toast.error(err.message);
        dispatch(ChangeOffers({data: [], loadStatus: Rejected}));
      });
  };

  const fetchOffer = ( id:string | undefined ):ThunkActionResualt =>
  async (dispatch, _getState, api) => {
    dispatch( ChangeOffer({data: null, loadStatus: Pending}) );
    await api.get<Offer>(APIRoute.Offers + '/' + id)
      .then(({data}) => {
        dispatch( ChangeOffer({data: data, loadStatus: Fulfilled}) );
      })
      .catch((err: Error) => {
        toast.error(err.message);
        dispatch(ChangeOffer({data: null, loadStatus: Rejected}));
      });
  };

const fetchNearOffers = (Id: string | undefined):ThunkActionResualt =>
  async (dispatch, _getState, api) => {
    const id = Number(Id);
    dispatch(ChangeNearOffers({id, data:[], loadStatus: Pending}));
    await api.get<Offers>(`${generatePath(APIRoute.GetNearOffers,{'hotel_id': Id})}`)
      .then(({data}) => dispatch( ChangeNearOffers({id, data, loadStatus: Fulfilled}) ))
      .catch((err:Error) => {
        toast.error(err.message);
        dispatch(ChangeNearOffers({id:null, data:[], loadStatus: Rejected}));
      });
  };

const fetchReviews = (Id: string | undefined):ThunkActionResualt =>
  async (dispatch, _getState, api) => {
    const id = Number(Id);
    dispatch(ChangeReviews({id, data:[], loadStatus: Pending}));
    await api.get<Review[]>(`${generatePath(APIRoute.GetReviews,{'hotel_id' : Id})}`)
      .then(({data}) => {
        dispatch( ChangeReviews({id, data, loadStatus: Fulfilled}) );
      })
      .catch((err) => {
        toast.error(err.message);
        dispatch(ChangeReviews({id:null, data:[], loadStatus: Rejected}));
      });
  };

const postReview = ( { id, comment, rating }:ReviewState ):ThunkActionResualt< Promise<boolean | undefined >> =>
  async (dispatch, getState, api) => {
    const reviews = getState().DATA.reviews.data;
    dispatch(ChangeReviews({id, data:reviews, loadStatus: Pending}));
    return await api.post< Review[] >( `${generatePath(APIRoute.PostReview, {'hotel_id' : id.toString()})}`,{ comment, rating } )
      .then( ({data}) => {
        dispatch( ChangeReviews({id, data, loadStatus: Fulfilled}) );
        return true ;
      })
      .catch((err) => {
        toast.error(err);
        dispatch(ChangeReviews({id:null, data:reviews, loadStatus: Rejected}));
        dispatch(SetReviewError( true ));
        return undefined;
      });
  };

const fetchFavorites = ():ThunkActionResualt =>
  async (dispatch, _getState, api) => {
    dispatch(ChangeFavorites({data: [], loadStatus: Pending }));
    await api.get< Offers >(APIRoute.GetFavorites)
      .then( ({data}) => {
        dispatch(ChangeFavorites({data, loadStatus: Fulfilled }));
      })
      .catch((err: Error) => {
        toast.error(err.message);
        dispatch(ChangeFavorites({data: [], loadStatus: Rejected }));
      });
  };

const postFavorites = (id: string, status: boolean):ThunkActionResualt =>
  async (dispatch, getState, api) => {
    toast.dismiss();
    dispatch( ChangeFavorites({...getState().DATA.favorites, loadStatus: Pending }) );
    toast.loading('Wait...');
    await api.post< Offer >(`${generatePath(APIRoute.PostFavorite, {
      'hotel_id':id,
      'status': status ? FavoritesConfig.add : FavoritesConfig.remove
    })}`)
      .then(({data}) => {
        toast.dismiss();
        const actualOffersArr = getActualArr(getState().DATA.offers.data, data) ;
        dispatch( ChangeOffers({ data: actualOffersArr, loadStatus: Fulfilled}) ) ;
        dispatch( ChangeFavorites({data: actualOffersArr.filter((offer) => offer.isFavorite), loadStatus: Fulfilled}) ) ;
        const actualNearOffersArr = getActualArr(getState().DATA.nearOffers.data, data);
        dispatch( ChangeNearOffers({...getState().DATA.nearOffers, data: actualNearOffersArr}) );
        status
          ? toast.success('Успешно добавлено в избранное')
          : toast.success('Успешно удалено из избранного');
      })
      .catch((err) => {
        toast.error(err);
        dispatch( ChangeFavorites({...getState().DATA.favorites, loadStatus: Rejected }) );
      });
  };

const checkAuth = ():ThunkActionResualt =>
  async (dispatch, _getState, api) => {
    await api.get(APIRoute.Login)
      .then(
        (response) => {
          if (response && response.data){
            dispatch(RequireAuth(Auth));
            dispatch(SetUser(response.data) );
          }
        },
        (err) => dispatch(RequireAuth(NoAuth)) );
  };

const loginSession = ({ email, password }:AuthData):ThunkActionResualt =>
  async (dispatch, _getState, api) => {
    await api.post<AuthUser>(APIRoute.Login, {email, password})
      .then( ( {data} ) => {
        saveToken(data.token);
        dispatch(RequireAuth(Auth));
        dispatch(SetUser(data));
      })
      .catch((err:Error) => {
        toast.error(err.message);
        dispatch( SetloginError(true) );
      });
  };

const logoutSession = ():ThunkActionResualt =>
  async (dispatch, getState, api) => {
    dispatch( SetLogOutProcess(true) );
    await api.delete(APIRoute.Logout)
      .then(() => {
        dropToken();
        const notElectedArr = clearSession(getState().DATA.offers.data);
        dispatch(ChangeOffers({data: notElectedArr, loadStatus: Fulfilled}) );
        dispatch(ChangeFavorites({data: [], loadStatus: Idle }) );
        dispatch(RequireAuth(NoAuth) );
        dispatch(RedirectToPath( AppRoute.Auth ) );
        dispatch(SetUser(null) );
      })
      .catch((err) => {
        dispatch( SetLogoutError( true ) );
      })
      .finally(() => dispatch( SetLogOutProcess(false) ));
  };

export {
  fetchOffers,
  fetchOffer,
  postFavorites,
  checkAuth,
  loginSession,
  logoutSession,
  fetchNearOffers,
  fetchFavorites,
  fetchReviews,
  postReview
};


