import { getSystemErrorMap } from "util";
import { csrfFetch } from "./csrf";

// Endpoints:
// URL: /api/bookings/current GET all bookings for current user
// URL: /api/spots/:spotId/bookings GET all bookings for a spot
// URL: /api/spots/:spotId/bookings POST (create) a booking based on spot id
// URL: /api/bookings/:bookingId PUT (edit) a booking
// URL: /api/bookings/:bookingId DELETE a booking


// Actions
const CREATE_BOOKING = 'bookings/BOOKINGS_CREATE';
const READ_BOOKINGS_USER = 'bookings/BOOKINGS_READ_USER';
const UPDATE_BOOKINGS = 'bookings/BOOKINGS_UPDATE';
const DELETE_BOOKING = 'bookings/BOOKINGS_DELETE';


// Action Creators

// booking =
export const actionCreateBooking = (booking) => {
  return {
    type: CREATE_BOOKING,
    booking
  }
}

export const actionReadBookings = (bookings) => {
  return {
    type: READ_BOOKINGS_USER,
    bookings
  }
}


// Thunks
export const thunkCreateBooking = (booking, spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
    method: 'POST',
    body: JSON.stringify({
      ...booking
    })
  });

  if (response.ok) {
    const book = await response.json();
    dispatch(actionCreateBooking(book));
    return null;
  } else {
    const data = await response.json();
    if (data.errors) {
      return data;
    } else {
      return ['Unknown Error: Could Not Create Booking'];
    }
  }
}

export const thunkReadBookings = () => async (dispatch) => {
  const response = await csrfFetch('/api/bookings/current');

  if (response.ok) {
    const bookings = await response.json();
    dispatch(actionReadBookings(bookings));
    return null;
  } else {
    const data = await response.json();
    if (data.errors) {
      return data;
    } else {
      return ['Unknown Error: Could Not Fetch Bookings'];
    }
  }
}

// Reducer
export default function bookingsReducer(state = {}, action) {
  switch (action.type) {
    case CREATE_BOOKING: {
      const newState = {...state }

      newState[action.booking.id] = action.booking;
      return newState;
    }
    case READ_BOOKINGS_USER: {
      const newState = {...action.bookings};
      return newState;
    }
    default: {
      return state;
    }
  }
}
