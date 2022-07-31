import { RaitingInputData } from '../../const';
import { Fragment, ReactElement } from 'react';

function InputRaiting ():ReactElement{

  return (
    <>
      { RaitingInputData.map( (option) => (
        <Fragment key={option.value} >
          <input
            className = 'form__rating-input visually-hidden'
            name = 'rating'
            value = {`${option.value}`}
            id = {`${option.value}-stars`}
            type = 'radio'
            key={option.value}
          />
          <label
            className = 'reviews__rating-label form__rating-label'
            htmlFor = {`${option.value}-stars`}
            title = {option.title}
          >
            <svg className = 'form__star-image' width='37' height='33'>
              <use xlinkHref = '#icon-star'/>
            </svg>
          </label>
        </Fragment>
      )
      )}
    </>
  );
}


export default InputRaiting;
