import InputRaiting from '../../../components/input-raiting/input-raiting';
import { useState, ChangeEvent } from 'react';
import { ReviewState } from '../../../types/reviews';

export const FormReview = ():JSX.Element => {
  const [ reviewFormData, setReviewFormData ] = useState<ReviewState>({
    raiting: null,
    comment: ''
  });

  return (
    <form className='reviews__form form' action='#' method='post' >
      <label className='reviews__label form__label' htmlFor='review'>Your review</label>
      <div
        className='reviews__rating-form form__rating'
        onChange={( {target}: ChangeEvent <HTMLInputElement> ):void => {
          setReviewFormData({
            ...reviewFormData,
            raiting: Number(target.value)
          });
        }}
      >
        <InputRaiting />
      </div>
      <textarea
        className='reviews__textarea form__textarea'
        onChange={( {target}:ChangeEvent <HTMLTextAreaElement> ):void =>{
          setReviewFormData({
            ...reviewFormData,
            comment: target.value
          });
        }}
        id='review'
        name='review'
        value={reviewFormData.comment}
        placeholder='Tell how was your stay, what you like and what can be improved'
      />
      <div className='reviews__button-wrapper'>
        <p className='reviews__help'>
          To submit review please make sure to set <span className='reviews__star'>rating</span> and describe your
          stay with at least <b className='reviews__text-amount'>50 characters</b>.
        </p>
        <button className='reviews__submit form__submit button' type='submit' disabled>Submit</button>
      </div>
    </form>
  );
};
