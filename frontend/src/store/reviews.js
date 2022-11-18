import { csrfFetch } from "./csrf";
import { thunkGetAllSpotInfo } from './singleSpot';

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

export const actionReviewDelete = (spotId, reviewId) => {
  return {
    type: REVIEW_DELETE,
    spotId,
    reviewId
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

    await dispatch(actionReviewCreate(review));

    dispatch(thunkGetAllSpotInfo(spotId));
    return response;
  }
}

export const thunkReviewDelete = (spotId, reviewId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    dispatch(actionReviewDelete(spotId, reviewId));
    dispatch(thunkGetAllSpotInfo(spotId));
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

      if (!newState.Reviews[action.review.spotId]) {
        newState.Reviews[action.review.spotId] = [];
        newState.Reviews[action.review.spotId].push(action.review);
      } else {
        newState.Reviews[action.review.spotId].push(action.review);
      }

      return newState;
    }
    case REVIEW_DELETE: {
      const newState = {...state};
      let spotReviewsArray = newState.Reviews[action.spotId];
      console.log('SPOT REVIEWS ARRAY: ', newState.Reviews[action.spotId]);
      console.log(action.reviewId);

      for (let i = 0; i < spotReviewsArray.length; i++) {
        console.log('ITERATING', spotReviewsArray[i]);
        if (spotReviewsArray[i].id === +action.reviewId) {
          console.log('BEFORE DELETE: ', newState.Reviews[action.spotId])
          newState.Reviews[action.spotId].splice(i, 1);
          console.log('AFTER DELETE: ', newState.Reviews[action.spotId])
        }
      }

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

/*
SPOT REVIEWS ARRAY:
*/
