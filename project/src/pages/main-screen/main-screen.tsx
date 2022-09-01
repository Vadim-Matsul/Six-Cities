import { getCurrentCity, getSortedOffers } from '../../store/reducer/logic-reducer/selectors';
import { useSelector } from 'react-redux';

import classNames from 'classnames';
import Header from '../../components/header/header';
import NoPlacesScreen from '../no-places-screen/no-places-screen';
import LocationList from '../../components/location-list/location-list';
import MainOffers from '../../components/main-screen-components/main-offers/main-offers';


function MainScreen ( ):JSX.Element{

  const currentCity = useSelector( getCurrentCity );
  const offersOfCity = useSelector( getSortedOffers );

  const mainClass = classNames('cities__places-container container', {
    'cities__places-container--empty' : !offersOfCity.length
  });
  console.log('rerender MainScreen');
  

  return (
    <div className='page page--gray page--main'>
      <Header />
      <main className='page__main page__main--index'>
        <h1 className='visually-hidden'>Cities</h1>
        <LocationList uniqueCity={ currentCity } />
        <div className='cities'>
          <div
            className={ mainClass }
            data-testid='MainScreen'
          >
          { offersOfCity.length
            ? <MainOffers offersOfCity={ offersOfCity } currentCity={ currentCity }/>
            : <NoPlacesScreen city={ currentCity }/>
          }
          </div>
        </div>
      </main>
    </div>
  );
}


export default MainScreen;
