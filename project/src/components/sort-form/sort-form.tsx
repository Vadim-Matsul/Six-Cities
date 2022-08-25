import { SortTypes } from '../../const';
import { useEffect, useState } from 'react';
import { ChangeCurrentSort } from '../../store/actions/actions';
import { useDispatch } from 'react-redux';

type SortFormProps = {
  currentSort: string,
  currentCity: string
}


function SortForm ({ currentSort, currentCity }:SortFormProps){
  const [show, setShow] = useState<boolean>(false);
  const dispatch = useDispatch();
  const sortArray = Object.values(SortTypes);
  useEffect(() => setShow(false),[currentCity]);

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
        onClick={() => setShow((prevState) => !prevState)}
        data-testid='SortForm-show'
      > {currentSort}
        <svg className='places__sorting-arrow' width='7' height='4' >
          <use xlinkHref='#icon-arrow-select'/>
        </svg>
      </span>
      <ul
        className={`places__options places__options--custom ${show ? 'places__options--opened' : ''}`}
        data-testid='SortForm-items'
      >
        {sortArray.map((sort) => (
          <li
            className={`places__option ${currentSort === sort ? 'places__option--active' : ''}`}
            key = { sort }
            tabIndex={ 0 }
            onClick={() => {
              dispatch(ChangeCurrentSort(sort));
              setShow((prevState) => !prevState);
            }}
            data-testid='SortForm-item'
          >{ sort }
          </li>
        ))}
      </ul>
    </form>
  );
}


export default SortForm;
