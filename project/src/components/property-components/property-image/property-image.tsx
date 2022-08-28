type PropertyImageProps = {
  src: string
}

function PropertyImage ({src}:PropertyImageProps):JSX.Element {
  return (
    <div className='property__image-wrapper'>
      <img
        className='property__image'
        src= { src }
        alt='Property Image'
      />
    </div>
  );
}


export default PropertyImage;
