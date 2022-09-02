import React from 'react';

import { ImagesSize } from '../../../const';

import PropertyImg from './property-img/property-img';


type PropertyImageProps = {
  Images: string[]
}

const PropertyImage: React.FC< PropertyImageProps > = ({Images}) => {
  const images = Images.slice( ImagesSize.START, ImagesSize.END );

  return (
    <div className='property__gallery-container container'>
      <div className='property__gallery'>
        {images.map( (src) => <PropertyImg src={ src } key={ src }/> ) }
      </div>
    </div>
  );
};


export default React.memo(PropertyImage);
