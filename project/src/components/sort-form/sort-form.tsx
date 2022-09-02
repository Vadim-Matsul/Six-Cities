import React from 'react';

import { SortTypes } from '../../const';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import SortFormLi from './sort-form-li/sort-form-li';

type SortFormProps = {
  currentSort: string,
  currentCity: string
}


function SortForm ({ currentSort, currentCity }:SortFormProps){
  const [show, setShow] = useState<boolean>(false);
  const sortArray = Object.values(SortTypes);

  const showFormClass = classNames('places__options places__options--custom',{
    'places__options--opened' : show
  });

  useEffect(() => setShow(false),[currentCity]);

  const handlerShowForm = () => setShow( (prevState) => !prevState );

  return (
    <form className='places__sorting' action='#' method='get'>
      <span
        className='places__sorting-caption'
        data-testid='SortForm-sortBy'
      >Sort by
      </span>
      <span
        className='places__sorting-type'
        tabIndex={ 0 }
        onClick={ handlerShowForm }
        data-testid='SortForm-show'
      > { currentSort }
        <svg className='places__sorting-arrow' width='7' height='4' >
          <use xlinkHref='#icon-arrow-select'/>
        </svg>
      </span>
      <ul
        className={ showFormClass }
        data-testid='SortForm-items'
      >
        {sortArray.map((sort) => (
          <SortFormLi
            sort={ sort }
            currentSort={ currentSort }
            setShow={ setShow }
            key={ sort }
          />))}
      </ul>
    </form>
  );
}


export default React.memo(SortForm);
