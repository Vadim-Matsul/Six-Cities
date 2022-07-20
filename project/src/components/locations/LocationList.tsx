import Location from './Location';

function LocationList ():JSX.Element {
  return (
    <ul className='locations__list tabs__list'>
      <Location place = {'Paris'} />
      <Location place = {'Cologne'} />
      <Location place = {'Brussels'} />
      <Location place = {'Amsterdam'} />
      <Location place = {'Hamburg'} />
      <Location place = {'Dusseldorf'} />
    </ul>
  );
}


export default LocationList;
