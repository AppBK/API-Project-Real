import { csrfFetch } from "./csrf";
import { useDispatch } from "react-redux";

const dispatch = useDispatch();

// Actions
const USER_SIGNUP = 'user/SIGNUP';

// Action Creators
export const actionSignup = (body) => {
  return {
    type: USER_SIGNUP,
    body
  }
}

// Thunks
export const thunkSignupUser = (body) => async (dispatch) => {
  const response = csrfFetch('api/user', {
    method: 'POST',
    body: JSON.stringify({
      ...body
    })
  });

  if (response.ok) {
    const data = await (await response).json();
    dispatch(actionSignup(data));
    return response;
  }
}

// Reducer
export default function SignupReducer(state = {}, action) {
  switch(action.type) {
    default: {
      return state;
    }
  }
}
