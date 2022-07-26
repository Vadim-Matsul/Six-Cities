import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import classNames from 'classnames';
import { useRef } from 'react';
import React from 'react';

import { postReview, ThunkDispatchResualt } from '../../../store/actions/api-actions';
import { getReviewError } from '../../../store/reducer/user-reducer/selectors';
import { ReviewFormState, ReviewState } from '../../../types/reviews';
import { SetReviewError } from '../../../store/actions/actions';
import { useTimeout } from '../../../hooks/useTimeout';
import { MessageConfig } from '../../../const';

import MessageError from '../../message-error/message-error';
import InputRaiting from '../../property-components/input-raiting/input-raiting';


type FormReviewProps = {
  id: number
}


const FormReview = ( { id }:FormReviewProps ):JSX.Element => {
  const dispatch = useDispatch() as ThunkDispatchResualt;
  const reviewError = useSelector( getReviewError );
  const submitFlag = useRef<undefined | boolean>( undefined );

  useTimeout(reviewError, SetReviewError, 3000);
  const {
    register,
    handleSubmit,
    reset,
    formState:{ errors, isValid, isSubmitting }
  } = useForm< ReviewFormState >({mode:'onChange'});


  const textareaClass = classNames('reviews__textarea form__textarea',{
    'disable' : submitFlag.current
  });
  const ratingWrapper = classNames('reviews__rating-form form__rating',{
    'disable' : submitFlag.current
  });
  const formClass = classNames('reviews__form form',{
    'horizontal-shake review__error__message' : reviewError
  });
  const buttonClass = classNames('reviews__submit form__submit button', {
    'review_sucessfully_submit' : submitFlag.current
  });


  const buttonText = submitFlag.current ? 'Successfully' : 'Submit' ;
  const buttonSubmit = isSubmitting ? 'Pending...' : buttonText ;
  const actualTextForButton = reviewError ? 'Error, try again' : buttonSubmit ;

  const flagForSubmit = actualTextForButton === 'Successfully';

  async function HandlerSubmit ( review:ReviewFormState ) {
    const forPost:ReviewState = {...review, id };
    await dispatch( postReview(forPost) ).then((answer) => {
      if (answer){ submitFlag.current = answer; reset(); }
      else { toast.dismiss(); toast.error('ошибка отправки формы'); }
    });
  }

  const registerForTextArea = {
    ...register('comment', {
      required: MessageConfig.required,
      minLength:{
        value: 50,
        message: MessageConfig.minLengthComment
      },
      maxLength:{
        value: 150,
        message: MessageConfig.maxLengthComment
      }
    })};

  const registerForInput = {
    ...register('rating', {
      required: MessageConfig.required,
    })};


  return (
    <form
      className={ formClass }
      action='#'
      method='post'
      onSubmit={ handleSubmit(HandlerSubmit) }
      data-testid='FormReview'
    >
      <label className='reviews__label form__label' htmlFor='review'>Your review</label>
      <div className={ ratingWrapper }>
        { errors.rating && <MessageError message={ errors.rating.message }/> }
        <InputRaiting
          flag={ flagForSubmit }
          validate={ registerForInput }
        />
      </div>
      <textarea
        className={ textareaClass }
        id='review'
        maxLength={ 150 }
        placeholder='Tell how was your stay, what you like and what can be improved'
        disabled={ flagForSubmit }
        data-testid='FormReview-textarea'
        {...registerForTextArea}
      />
      { errors.comment && <MessageError message={ errors.comment.message }/> }
      <div className='reviews__button-wrapper'>
        <p className='reviews__help'>
          To submit review please make sure to set <span className='reviews__star'>rating</span> and describe your
          stay with at least <b className='reviews__text-amount'>50 characters</b>.
        </p>
        <button
          className={ buttonClass }
          type='submit'
          disabled={!isValid || submitFlag.current}
        >{ actualTextForButton }
        </button>
      </div>
    </form>
  );
};


export default React.memo( FormReview );
