function HouseProperties ({ includes }:{includes: string}):JSX.Element {
  return (
    <li className='property__inside-item'>
      { includes }
    </li>
  );
}


export default HouseProperties;
