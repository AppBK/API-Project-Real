import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, NavLink } from 'react-router-dom';
import { thunkRestoreUser } from './store/session';
import SignupForm from './components/SignupForm';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import TypeCarousel from './components/TypeCarousel';
import Spots from './components/Spots';
import Spot from './components/Spot';
import { actionUserAdd } from './store/session';


let validation;
function App() {
  const session = useSelector(state => state.session);
  const dispatch = useDispatch();

  // validation = localStorage.getItem("user");
  // if (validation && session['user']) validation = true;
  // else if (validation && !session['user']) {
  //   dispatch(actionUserAdd(validation));
  //   validation = true;
  // }

  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(thunkRestoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  // if (!isLoaded) {
  //   const hasLoginInfo = sessionStorage.getItem("user");

  //   if (hasLoginInfo) {
  //     dispatch(thunkRestoreUser()).then(() => setIsLoaded(true));
  //   }
  // }


  return isLoaded && (
    <>
      <Navigation isLoaded={isLoaded} />
      <TypeCarousel isLoaded={isLoaded}/>
      {isLoaded && (
      <Switch>
        <Route exact path="/">
          <Spots isLoaded={isLoaded}/>
        </Route>
        <Route path="/spots/:spotId">
          <Spot isLoaded={isLoaded}/>
        </Route>
        <Route path="/signup">
          <SignupForm isLoaded={isLoaded}/>
        </Route>
      </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;
