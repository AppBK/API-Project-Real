import { csrfFetch } from './csrf';
import { actionSingleSpotDelete } from './singleSpot';
import { actionDeleteAllReviewsForSpot } from './reviews';

// Actions
const SPOTS_GET_ALL_INFO = 'spots/GETALL';
const SPOTS_GET_CATEGORY = 'spots/SPOTS_GET_CATEGORY';
const SPOTS_DELETE = 'spots/SPOTS_DELETE';
const SPOTS_EDIT = 'spots/SPOTS_EDIT';
const SPOTS_CREATE = 'spots/CREATE';
const SPOTS_DUMP = 'spots/SPOTS_DUMP';

// Action Creators
export const actionSpotsGetCategory = (spots) => {
  return {
    type: SPOTS_GET_CATEGORY,
    spots
  }
}

export const actionSpotEdit = (spot) => {
  return {
    type: SPOTS_EDIT,
    spot
  }
}

// export const actionSpotAddImage = (image, spotId) => {
//   return {
//     type: SPOTS_ADD_IMAGE,
//     image,
//     spotId
//   }
// }

export const actionSpotDelete = (spotId) => {
  return {
    type: SPOTS_DELETE,
    spotId
  }
}

export const actionSpotCreate = (spot) => {
  return {
    type: SPOTS_CREATE,
    spot
  }
}

export const actionSpotsDump = () => {
  return {
    type: SPOTS_DUMP,
  }
}

// Thunks
export const thunkGetAllSpots = (spotType) => async (dispatch) => {
  let response;
  if (spotType) {
    response = await csrfFetch(`/api/spots?where=${spotType}`);
  } else {
    response = await csrfFetch('/api/spots');
  }

  if (response.ok) {
    const spots = await response.json();

    dispatch(actionSpotsGetCategory(spots));
    return response;
  }
}

export const thunkSpotEdit = (spotId, spot) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'PUT',
    body: JSON.stringify({
      ...spot
    })
  });

  if (response.ok) {
    const updatedSpot = await response.json();

    dispatch(actionSpotEdit(updatedSpot));
    return updatedSpot;
  }
}

// export const thunkSpotAddImage = (spotId, url, prev) => async (dispatch) => {
//   const preview = prev === 'true' ? true : false;

//   const response = csrfFetch(`/api/spots/${spotId}/images`, {
//     method: 'POST',
//     body: JSON.stringify({
//       url,
//       preview
//     })
//   });

//   if (response.ok) {
//     const img = await response.json();

//     dispatch(actionSpotAddImage(img, spotId));
//     return response;
//   }
// }

export const thunkSpotDelete = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    dispatch(actionSpotDelete(spotId));
    dispatch(actionSingleSpotDelete(spotId));
    dispatch(actionDeleteAllReviewsForSpot(spotId));
    return response;
  }
}

export const thunkSpotCreate = (spot) => async (dispatch) => {
  const response = await csrfFetch('/api/spots', {
    method: 'POST',
    body: JSON.stringify({
      ...spot
    })
  });

  if (response.ok) {
    const newSpot = await response.json();
    console.log('A new spot?', newSpot);

    dispatch(actionSpotCreate(newSpot));

    return newSpot;
  }
}

export default function spotReducer(state = {}, action) {
  switch(action.type) {
    case SPOTS_GET_CATEGORY: {
      const newSpots = {};
      action.spots.Spots.forEach(spot => newSpots[spot.id] = spot);

      const newState = {...state, ...newSpots};
      return newState;
    }
    case SPOTS_GET_ALL_INFO: {
      const newState = {...state};
      newState.spots[action.spot.id] = action.spot;

      console.log('IN GET INFO: ', action.spot);

      return newState;
    }
    case SPOTS_DELETE: {
      const newState = {...state};
      delete newState[action.spotId];

      return newState;
    }
    case SPOTS_EDIT: {
      const newState = {...state};

      console.log('EDITNIG A SPOT: ', action.spot);
      newState[action.spot.id] = action.spot;

      return newState;
    }
    case SPOTS_CREATE: {
      const newState = {...state};
      newState[action.spot.id] = action.spot;

      return newState;
    }
    case SPOTS_DUMP: {
      return {};
    }
    default: {
      return state;
    }
  }
}
