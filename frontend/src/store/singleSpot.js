import { csrfFetch } from "./csrf";

// Actions
const SPOT_GET_ALL_INFO = 'spots/GET_ALL_INFO';

// Action Creators
export const actionGetAllSpotInfo = (spot) => {
  return {
    type: SPOT_GET_ALL_INFO,
    spot
  }
}

// Thunk
export const thunkGetAllSpotInfo = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`);

  if (response.ok) {
    const spot = await response.json();
    console.log('HIT SINGLE SPOT STORE', spot)

    dispatch(actionGetAllSpotInfo(spot));
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
    default: {
      return state;
    }
  }
}
