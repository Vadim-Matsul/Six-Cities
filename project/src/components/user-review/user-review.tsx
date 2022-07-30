import { Fragment } from 'react';
import { Reviews } from '../../types/reviews';
import { getFormateDate, getStars } from '../../utils/utils';

type UserReviewProps = {
  reviews: Reviews
}

function UserReview ( {reviews}:UserReviewProps ):JSX.Element{

  return (
    <Fragment>
      { reviews.map( (review) => {
        const date = getFormateDate(review.date);
        const raiting = getStars(review.rating);

        return(
          <li
            className='reviews__item'
            key={review.id}
          >
            <div className='reviews__user user'>
              <div className='reviews__avatar-wrapper user__avatar-wrapper'>
                <img
                  className='reviews__avatar user__avatar'
                  src={review.user.avatarUrl}
                  width='54'
                  height='54'
                  alt='Reviews avatar'
                />
              </div>
              <span className='reviews__user-name'>
                {review.user.name}
              </span>
            </div>
            <div className='reviews__info'>
              <div className='reviews__rating rating'>
                <div className='reviews__stars rating__stars'>
                  <span style={{ width: raiting }}></span>
                  <span className='visually-hidden'>Rating</span>
                </div>
              </div>
              <p className='reviews__text'>
                {review.comment}
              </p>
              <time className='reviews__time' dateTime={review.date}>{date}</time>
            </div>
          </li>
        );
      })}
    </Fragment>
  );
}


export default UserReview;
