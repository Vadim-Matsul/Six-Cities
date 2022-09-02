import { RaitingInputData } from '../../../const';
import { Fragment, ReactElement } from 'react';

type inputRaitingProps = {
  flag: boolean,
  // eslint-disable-next-line
  validate: any
}

function InputRaiting ( { flag, validate }:inputRaitingProps ):ReactElement{

  return (
    <>
      { RaitingInputData.map( (option) => (
        <Fragment key={option.value} >
          <input
            className = 'form__rating-input visually-hidden'
            value = {`${option.value}`}
            id = {`${option.value}-stars`}
            type = 'radio'
            key={option.value}
            disabled={ flag }
            {...validate}
          />
          <label
            className = {`reviews__rating-label ${flag ? '' : 'form__rating-label'}`}
            htmlFor = {`${option.value}-stars`}
            title = {option.title}
          >
            <svg className = 'form__star-image' width='37' height='33' >
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
