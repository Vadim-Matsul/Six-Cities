import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { ThunkDispatchResualt } from '../../../store/actions/api-actions';
import { ChangeCurrentCity } from '../../../store/actions/actions';


type FavoritesCityProps = {
  city: string
}

function FavoritesCity ({city}:FavoritesCityProps):JSX.Element{

  const dispatch = useDispatch() as ThunkDispatchResualt;

  return(
    <div className='favorites__locations locations locations--current'>
      <div
        className='locations__item'
        onClick={() => dispatch( ChangeCurrentCity(city) )}
      >
        <Link
          className='locations__item-link'
          to='/'
          data-testid='FavoritesCity'
        >
          <span>{city}</span>
        </Link>
      </div>
    </div>
  );
}


export default FavoritesCity;
