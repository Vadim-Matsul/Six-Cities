type Capacity = {
  entire:string
  bedrooms:string
  adults:string
}

function HouseCapacity ({entire, bedrooms, adults}:Capacity):JSX.Element {
  return (
    <ul className='property__features'>
      <li className='property__feature property__feature--entire'>
        { entire }
      </li>
      <li className='property__feature property__feature--bedrooms'>
        { bedrooms }
      </li>
      <li className='property__feature property__feature--adults'>
        { adults }
      </li>
    </ul>
  );
}


export default HouseCapacity;
