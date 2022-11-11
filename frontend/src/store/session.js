import { csrfFetch } from './csrf';

// Actions
const USER_ADD = 'user/ADD';
const USER_DELETE = 'user/DELETE';

// Action Creators
export const actionUserAdd = (user) => {
  return {
    type: USER_ADD,
    user
  }
}

export const actionUserDelete = () => {
  return {
    type: USER_DELETE,
  }
}

// Thunks
export const thunkUserLogin = (credentials) => async (dispatch) => {
  const response = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      ...credentials
    })
  });

  if (response.ok) {
    const user = await response.json();
    dispatch(actionUserAdd(user));

    return user;
  }
}

export const thunkRestoreUser = () => async (dispatch) => {
  const response = await csrfFetch('/api/session');
  const data = await response.json();
  dispatch(actionUserAdd(data.user));
  return response;
}

// Reducer
export default function sessionReducer(state = { user: null }, action) {
  switch(action.type) {
    case USER_ADD: {
      return { user: action.user };
    }
    case USER_DELETE: {
      return { user: null };
    }
    default: {
      return state;
    }
  }
}
