import React from 'react';
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { ChangeCurrentSort } from '../../../store/actions/actions';

type SortFormLiProps<T> = {
  sort: T,
  currentSort: T,
  setShow: React.Dispatch< React.SetStateAction<boolean> >
}

const SortFormLi: React.FC< SortFormLiProps<string> > = ({sort, currentSort, setShow}) => {
        
  const dispatch = useDispatch();
  const sortClass = classNames('places__option',{
    'places__option--active' : currentSort === sort
  });

  const handlerChangeSort = () => {
    dispatch(ChangeCurrentSort(sort));
    setShow((prevState) => !prevState);
  }

  return(
    <li
      className={ sortClass }
      tabIndex={ 0 }
      onClick={ handlerChangeSort }
      data-testid='SortForm-item'
    >{ sort }
    </li>
  );
};


export default SortFormLi;
