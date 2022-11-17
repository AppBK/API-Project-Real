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
export const thunkReviewsRead = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`);

  if (response.ok) {
    const reviews = await response.json();

    dispatch(actionReviewsRead(reviews));
  }
}


// Reducer
const reviewsReducer = (state = { Reviews: {}}, action) => {
  switch(action.type) {
    case REVIEWS_READ: {
      const newState = {...state};

      if (!newState['Reviews']) {
        newState.Reviews = {};
      }
      // console.log('Reviews Reducer: ', action.reviews);

      newState.Reviews[action.reviews.Reviews[0].spotId] = action.reviews.Reviews;
      return newState;
    }
    default: {
      return state;
    }
  }
}

export default reviewsReducer;


// Routes
// /api/spots/:spotId/reviews GET
// /api/spots/:spotId/reviews POST
// /api/reviews/:reviewId DELETE
