import InputRaiting from '../../../components/input-raiting/input-raiting';
import { useState, ChangeEvent, FormEvent } from 'react';
import { ReviewState } from '../../../types/reviews';
import { useDispatch } from 'react-redux';
import { postReview, ThunkDispatchResualt } from '../../../store/actions/api-actions';

type FormReviewProps = {
  id: number
}


export const FormReview = ( { id }:FormReviewProps ):JSX.Element => {
  const dispatch = useDispatch();
  const [booleanFlag, setBooleanFlag] = useState(false);
  const [ reviewFormData, setReviewFormData ] = useState<ReviewState>({
    id: id,
    rating: null,
    comment: ''
  });

  function handlerSubmitForm (evt: FormEvent<HTMLFormElement>){
    evt.preventDefault();
    (dispatch as ThunkDispatchResualt )( postReview( reviewFormData ) );
    setReviewFormData( {id: id, rating: null, comment:''} );
    setBooleanFlag(true);
  }

  return (
    <form
      className='reviews__form form'
      action='#'
      method='post'
      onSubmit={ handlerSubmitForm }
    >
      <label className='reviews__label form__label' htmlFor='review'>Your review</label>
      <div
        className='reviews__rating-form form__rating'
        onChange={( {target}: ChangeEvent <HTMLInputElement> ):void => {
          setReviewFormData({
            ...reviewFormData,
            rating: Number(target.value)
          });
        }}
      >
        <InputRaiting flag={ booleanFlag }/>
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
        name='comment'
        value={reviewFormData.comment}
        maxLength={150}
        placeholder='Tell how was your stay, what you like and what can be improved'
        disabled={ booleanFlag }
      />
      <div className='reviews__button-wrapper'>
        <p className='reviews__help'>
          To submit review please make sure to set <span className='reviews__star'>rating</span> and describe your
          stay with at least <b className='reviews__text-amount'>50 characters</b>.
        </p>
        <button
          className='reviews__submit form__submit button'
          type='submit'
          disabled = { reviewFormData.rating === null || reviewFormData.comment.length < 50 || booleanFlag }
        >Submit
        </button>
      </div>
    </form>
  );
};
