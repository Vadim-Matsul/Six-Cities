import { Fragment } from 'react';
import { Offer, Offers } from '../../../types/offers';
import { getSortedOffersCities } from '../../../utils/utils';
import { CardPageClass } from '../../../const';
import FavoritesCity from '../favorites-city/favorites-city';
import OfferList from '../../offer-components/offer-list/offer-list';

type FavoriteOffersListProps = {
  offers: Offers
}

function FavoriteOffersList ({offers}:FavoriteOffersListProps):JSX.Element{
  const favoriteOffers:[string,Offer[]][] = getSortedOffersCities(offers);

  return(
    <Fragment>
      {favoriteOffers.map((item) => {
        const [city, offersArr] = item;
        const keyValue = `${city} favorite-offer`;

        return (
          <li
            className='favorites__locations-items'
            key = {keyValue}
            data-testid='FavoriteOffersList'
          >
            <FavoritesCity city = { city }/>
            <div className='favorites__places'>
              <OfferList
                offers={offersArr}
                cardClass={CardPageClass.Favorites}
              />
            </div>
          </li>
        );
      })}
    </Fragment>
  );
}


export default FavoriteOffersList;
