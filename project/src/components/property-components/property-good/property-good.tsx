import React from 'react';


type PropertyGoodProps = {
  goods: string[]
}

function PropertyGood ({goods}:PropertyGoodProps):JSX.Element{
  console.log('PropertyGood reredner');
  
  return (
    <div className='property__inside'>
      <h2 className='property__inside-title'>What&apos;s inside</h2>
      <ul className='property__inside-list'>
        { goods.map((good) => (
          <li
            className='property__inside-item' key={good}
            data-testid='PropertyGood'
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
}


export default React.memo(PropertyGood);
