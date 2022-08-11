import { GeoCity } from '../../const';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';
import { ChangeCurrentCity } from '../../store/actions/actions';

type LocationListProps = {
  uniqueCity: string,
}

const mapDispatchToProps = (dispatcher: Dispatch) => ({
  onChangeCurrentCity(city: string){
    dispatcher(ChangeCurrentCity(city));
  }
});
const connector = connect(null, mapDispatchToProps);
type LocationListReduxProps = ConnectedProps<typeof connector>
type ConnectedLocationListProps = LocationListProps & LocationListReduxProps


function LocationList ({uniqueCity, onChangeCurrentCity}:ConnectedLocationListProps){
  const Sities = Object.keys(GeoCity);
  return (
    <div className='tabs'>
      <section className='locations container'>
        <ul className='locations__list tabs__list'>
          { Sities.map((city) => (
            <li className='locations__item' key={ city } >
              <a
                className={`locations__item-link tabs__item ${uniqueCity === city ? 'tabs__item--active' : ''}`}
                href='#'
                onClick={(ev) => {
                  ev.preventDefault();
                  onChangeCurrentCity(city);
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


export default connector(LocationList);
