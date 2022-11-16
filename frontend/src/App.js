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

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(thunkRestoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded && (
    <>
      <Navigation isLoaded={isLoaded} />
      <TypeCarousel />
      {isLoaded && (
      <Switch>
        <Route exact path="/">
          <Spots />
        </Route>
        <Route path="/spots/:spotId">
          <Spot />
        </Route>
        <Route path="/signup">
          <SignupForm />
        </Route>
      </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;
