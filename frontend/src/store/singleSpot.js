import { csrfFetch } from "./csrf";

// Actions
const SPOT_GET_ALL_INFO = 'spots/GET_ALL_INFO';
const SPOTS_EDIT = 'spots/SPOTS_EDIT';
const SPOTS_ADD_IMAGE = 'spots/SPOTS_ADD_IMAGE';

// Action Creators
export const actionGetAllSpotInfo = (spot) => {
  return {
    type: SPOT_GET_ALL_INFO,
    spot
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

// Thunk
export const thunkGetAllSpotInfo = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`);

  if (response.ok) {
    const spot = await response.json();

    dispatch(actionGetAllSpotInfo(spot));
    return spot;
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
    const spot = await response.json();

    dispatch(actionSpotEdit(spot));
    return spot;
  }
}

export const thunkSpotAddImage = (spotId, url, prev) => async (dispatch) => {
  const preview = prev === 'true' ? true : false;

  console.log('FROM IMAGE THUNK');

  const response = await csrfFetch(`/api/spots/${spotId}/images`, {
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

export default function singleSpotReducer(state = {}, action) {
  switch(action.type) {
    case SPOT_GET_ALL_INFO: {
      const newState = {...state};

      newState[action.spot.id] = action.spot;

      return newState;
    }
    case SPOTS_EDIT: {
      const newState = {...state};
      const temp = state[action.spot.id];


      const newSpot = {};

      newSpot[action.spot.id] = {};
      newSpot[action.spot.id].SpotImages = temp.SpotImages;
      newSpot[action.spot.id].category = temp.category;
      newSpot[action.spot.id].avgStarRating = temp.avgStarRating;
      newSpot[action.spot.id].numReviews = temp.numReviews;
      newSpot[action.spot.id].Owner = temp.Owner;

      newSpot[action.spot.id].id = action.spot.id;
      newSpot[action.spot.id].ownerId = action.spot.ownerId;
      newSpot[action.spot.id].address = action.spot.address;
      newSpot[action.spot.id].city = action.spot.city;
      newSpot[action.spot.id].state = action.spot.state;
      newSpot[action.spot.id].country = action.spot.country;
      newSpot[action.spot.id].lat = action.spot.lat;
      newSpot[action.spot.id].lng = action.spot.lng;
      newSpot[action.spot.id].name = action.spot.name;
      newSpot[action.spot.id].description = action.spot.description;
      newSpot[action.spot.id].price = action.spot.price;
      newSpot[action.spot.id].createdAt = action.spot.createdAt;
      newSpot[action.spot.id].updatedAt = action.spot.updatedAt;

      console.log('NEW SPOT FROM EDIT: ', newSpot);

      newState[action.spot.id] = newSpot;

      return newSpot;
    }
    case SPOTS_ADD_IMAGE: {
      const newState = { ...state };
      newState[action.spotId].SpotImages.unshift(action.image);
      console.log('FROM SPOT REDUCER, IMAGES ARRAY: ', newState[action.spotId].SpotImages);

      return newState;
    }
    default: {
      return state;
    }
  }
}
