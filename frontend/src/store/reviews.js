import { csrfFetch } from "./csrf";

// Actions
const REVIEWS_READ = 'reviews/REVIEWS_READ';
const REVIEW_CREATE = 'reviews/REVIEW_CREATE';
const REVIEW_DELETE = 'reviews/REVIEW_DELETE';


// Action Creators
export const actionReviewsRead = (reviews) => {
  return {
    type: REVIEWS_READ,
    reviews
  }
}


// Thunks

// Reducer
const reviewsReducer = (state = {}, action) => {
  switch(action.type) {
    default: {
      return state;
    }
  }
}

export default reviewsReducer;
