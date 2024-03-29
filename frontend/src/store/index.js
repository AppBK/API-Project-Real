import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer, { thunkUserLogin } from './session';
import spotReducer from './spot';
import singleSpotReducer from './singleSpot';
import reviewsReducer from './reviews';
import bookingsReducer from './bookings';

// Reducers
const rootReducer= combineReducers({
  session: sessionReducer,
  spots: spotReducer,
  spotDetails: singleSpotReducer,
  reviews: reviewsReducer,
  bookings: bookingsReducer,
});

// Enhancers
let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}


const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
