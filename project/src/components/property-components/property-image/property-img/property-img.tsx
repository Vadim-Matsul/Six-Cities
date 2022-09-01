import React from 'react';

type PropertyImgProps = {
  src: string
}

const PropertyImg: React.FC<  PropertyImgProps > = ({ src }) => (
  <div className='property__image-wrapper'>
    <img
      className='property__image'
      src= { src }
      alt='Property Image'
    />
  </div>
  )

export default PropertyImg;
