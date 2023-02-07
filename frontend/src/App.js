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
import ComingSoon from './components/ComingSoon';
import Test from './components/Test/Test';
import SplangyIt from './components/SplangyIt/SplangyIt';
import Trip from './components/Trips/Trips';


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
      {isLoaded && (
      <Switch>
        <Route exact path="/">
          <TypeCarousel isLoaded={isLoaded} />
          <Navigation isLoaded={isLoaded} />
          <Spots isLoaded={isLoaded}/>
        </Route>
        <Route path="/spots/:spotId">
          <Navigation isLoaded={isLoaded} />
          <Spot isLoaded={isLoaded}/>
        </Route>
        <Route exact path="/splangyit">
          <SplangyIt></SplangyIt>
        </Route>
        <Route path="/coming">
          <Navigation isLoaded={isLoaded} />
          <ComingSoon />
        </Route>
        <Route path="/tester">
          <Test></Test>
        </Route>
        <Route path="/trips">
          <Navigation isLoaded={isLoaded} />
          <Trip></Trip>
        </Route>
      </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;
