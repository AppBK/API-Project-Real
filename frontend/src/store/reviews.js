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

export const actionReviewCreate = (review) => {
  return {
    type: REVIEW_CREATE,
    review
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


export const thunkReviewCreate = (spotId, review) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: 'POST',
    body: JSON.stringify({
      ...review
    })
  });

  if (response.ok) {
    const review = await response.json();

    dispatch(actionReviewCreate(review));
    return response;
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
    case REVIEW_CREATE: {
      const newState = {...state};

      if (!newState.Reviews[action.review.spotId]) newState.Reviews[action.review.spotId] = [];
      newState.Reviews[action.review.spotId].push(action.review);

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
