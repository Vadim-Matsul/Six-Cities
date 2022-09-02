import React from 'react';
import { capitalizeFirstLetter } from '../../../utils/utils';

type PropertyFeaturesProps< T, N > = {
  type: T,
  bedrooms: N,
  adults: N
}

const PropertyFeatures: React.FC< PropertyFeaturesProps<string, number> > = ({ type, bedrooms, adults }) => {
  const offerType = capitalizeFirstLetter( type );

  return (
    <ul className='property__features'>
      <li className='property__feature property__feature--entire'>
        {offerType}
      </li>
      <li className='property__feature property__feature--bedrooms'>
        {bedrooms} Bedrooms
      </li>
      <li className='property__feature property__feature--adults'>
        Max {adults} adults
      </li>
    </ul>
  );
};


export default React.memo(PropertyFeatures);
