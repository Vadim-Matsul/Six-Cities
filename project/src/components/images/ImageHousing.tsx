
type ImageHousingProps = {
  src: string
}

function ImageHousing (props: ImageHousingProps):JSX.Element {

  return (
    <div className="property__image-wrapper">
      <img className="property__image" src={props.src} alt="Photo studio"/>
    </div>
  );
}


export default ImageHousing;
