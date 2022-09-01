import React from 'react';
import { BlockClass } from '../../const';
import { getStars } from '../../utils/utils';

type  RaitingBlockProps = {
  Raiting: number
  Raiting_class: BlockClass
}

const RaitingBlock: React.FC< RaitingBlockProps > = ({ Raiting, Raiting_class }) => {
  const raiting = getStars(Raiting);
  const shouldShow = Raiting_class === BlockClass.Property
  console.log('RaitingBlock rerender');
  
  return (
    <div className={`${Raiting_class}__rating rating`}>
      <div className={`${Raiting_class}__stars rating__stars`}>
        <span style={{ width: raiting }}></span>
        <span className='visually-hidden' data-testid='Rating-block'>Rating {Raiting}</span>
      </div>
      { shouldShow && <span className='property__rating-value rating__value'>{ Raiting }</span>}
    </div>
  );
};


export default React.memo(RaitingBlock);
