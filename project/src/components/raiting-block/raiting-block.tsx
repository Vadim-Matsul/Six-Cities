import React from 'react';

import { getStars } from '../../utils/utils';
import { BlockClass } from '../../const';


type RaitingBlockProps = {
  Raiting: number
  RaitingClass: BlockClass
}

const RaitingBlock: React.FC< RaitingBlockProps > = ({ Raiting, RaitingClass }) => {
  const raiting = getStars(Raiting);
  const shouldShow = RaitingClass === BlockClass.Property;

  return (
    <div className={`${RaitingClass}__rating rating`}>
      <div className={`${RaitingClass}__stars rating__stars`}>
        <span style={{ width: raiting }}></span>
        <span className='visually-hidden' data-testid='Rating-block'>Rating {Raiting}</span>
      </div>
      { shouldShow &&
        <span
          className='property__rating-value rating__value'
          data-testid='RaitingBlock_forProperty'
        >{ Raiting }
        </span> }
    </div>
  );
};


export default React.memo(RaitingBlock);
