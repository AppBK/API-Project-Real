import { csrfFetch } from "./csrf";

// Actions
const SPOT_GET_ALL_INFO = 'spots/GET_ALL_INFO';
const SPOTS_EDIT = 'spots/SPOTS_EDIT';

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
    default: {
      return state;
    }
  }
}
