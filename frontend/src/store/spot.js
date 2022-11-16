import { csrfFetch } from './csrf';

// Actions
const SPOTS_GET_ALL_INFO = 'spots/GETALL';
const SPOTS_GET_CATEGORY = 'spots/SPOTS_GET_CATEGORY';
const SPOTS_DELETE = 'spots/SPOTS_DELETE';
const SPOTS_EDIT = 'spots/SPOTS_EDIT';
const SPOTS_ADD_IMAGE = 'spots/SPOTS_ADD_IMAGE';

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

export const actionSpotAddImage = (image, spotId) => {
  return {
    type: SPOTS_ADD_IMAGE,
    image,
    spotId
  }
}

export const actionSpotDelete = (spotId) => {
  return {
    type: SPOTS_DELETE,
    spotId
  }
}
// export const actionSpotsGetInfo = (spot) => {
//   return {
        // type: SPOTS_GET_ALL_INFO,
//      spot
// }

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

export const thunkSpotEdit = () => async (dispatch) => {
  const response = await csrfFetch();
}

export const thunkSpotAddImage = (spotId, url, prev) => async (dispatch) => {
  const preview = prev === 'true' ? true : false;

  const response = csrfFetch(`/api/spots/${spotId}/images`, {
    method: 'POST',
    body: JSON.stringify({
      url,
      preview
    })
  });

  if (response.ok) {
    const img = await response.json();

    dispatch(actionSpotAddImage(img, spotId));
    return response;
  }
}

export const thunkSpotDelete = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    dispatch(actionSpotDelete(spotId));
    return response;
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
    case SPOTS_ADD_IMAGE: {
      const newState = {...state};
      newState[action.spotId].SpotImages[action.image.id] = action.image;

      return newState;
    }
    case SPOTS_DELETE: {
      const newState = {...state};
      delete newState[action.spotId];

      return newState;
    }
    default: {
      return state;
    }
  }
}
