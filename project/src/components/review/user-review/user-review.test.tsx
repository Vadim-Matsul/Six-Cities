import { render, screen } from '@testing-library/react';
import { makeFakeReviews } from '../../../utils/mock';
import UserReview from './user-review';

const fakeReviews = makeFakeReviews();

describe('Component: UserReview', () => {

  it('successfully render', () => {
    render( <UserReview reviews={ fakeReviews } /> );
    expect(screen.getAllByAltText('Reviews avatar').length).toBe(fakeReviews.length);
  });

});

