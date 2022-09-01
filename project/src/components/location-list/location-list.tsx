import React, { useMemo } from 'react';
import { GeoCity } from '../../const';
import LocationListLi from './location-list-li/location-list-li';

type LocationListProps = {
  uniqueCity: string,
}


function LocationList ({ uniqueCity }:LocationListProps){
  const Sities = useMemo(() => Object.keys(GeoCity),[GeoCity]);

  return (
    <div className='tabs'>
      <section className='locations container'>
        <ul className='locations__list tabs__list'>
          { Sities.map((city) =>
            <LocationListLi
              city={ city }
              uniqueCity={ uniqueCity }
              key={ city }  
            />
          )}
        </ul>
      </section>
    </div>
  );
}


export default React.memo(LocationList);
