import { csrfFetch } from './csrf';

// Actions
const SPOTS_GETALL = 'spots/GETALL';
const SPOTS_GET_CATEGORY = 'spots/SPOTS_GET_CATEGORY';

// Action Creators
export const actionSpotsGetCategory = (spots) => {
  return {
    type: SPOTS_GET_CATEGORY,
    spots
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

export default function spotReducer(state = {}, action) {
  switch(action.type) {
    case SPOTS_GET_CATEGORY: {
      const newSpots = {};
      action.spots.Spots.forEach(spot => newSpots[spot.id] = spot);

      const newState = {...state, ...newSpots};
      console.log('NEW STATE: ', newState);
      return newState;
    }
    default: {
      return state;
    }
  }
}
