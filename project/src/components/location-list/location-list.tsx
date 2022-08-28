import { AppRoute, GeoCity } from '../../const';
import { ChangeCurrentCity } from '../../store/actions/actions';
import { useDispatch } from 'react-redux';

type LocationListProps = {
  uniqueCity: string,
}


function LocationList ({ uniqueCity }:LocationListProps){
  const Sities = Object.keys(GeoCity);
  const dispatch = useDispatch();


  return (
    <div className='tabs'>
      <section className='locations container'>
        <ul className='locations__list tabs__list'>
          { Sities.map((city) => (
            <li className='locations__item' key={ city } >
              <a
                className={`locations__item-link tabs__item ${uniqueCity === city ? 'tabs__item--active' : ''}`}
                href={ AppRoute.Main }
                onClick={(ev) => {
                  ev.preventDefault();
                  dispatch( ChangeCurrentCity(city) );
                }}
              >
                <span>{city}</span>
              </a>
            </li>)
          )}
        </ul>
      </section>
    </div>
  );
}


export default LocationList;
