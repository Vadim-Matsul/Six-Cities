import React, { MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';

import { ThunkDispatchResualt } from '../../../store/actions/api-actions';
import { ChangeCurrentCity } from '../../../store/actions/actions';
import { AppRoute } from '../../../const';


type LocationListLiProps = {
    city: string,
    uniqueCity: string
}

const LocationListLi:React.FC<LocationListLiProps> = ({ city, uniqueCity }) => {
  const dispatch = useDispatch() as ThunkDispatchResualt;

  const linkClass = classNames('locations__item-link tabs__item',{
    'tabs__item--active' : uniqueCity === city
  });

  function handlerClick (ev: MouseEvent< HTMLAnchorElement > ) {
    ev.preventDefault();
    dispatch( ChangeCurrentCity(city) );
  }

  return(
    <li className='locations__item'>
      <a
        className={ linkClass }
        href={ AppRoute.Main }
        onClick={(ev) => handlerClick(ev)}
      >
        <span
          data-testid='LocationListLi_span'
        >{ city }
        </span>
      </a>
    </li>
  );
};

export default LocationListLi;
