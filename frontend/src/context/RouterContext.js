import { useState, createContext, useEffect } from 'react';

export const RouterContext = createContext();

export const RouterProvider = props => {
  const [spotType, setSpotType] = useState('BeachFront');

  useEffect(() => {
    console.log('SPOT TYPE FROM PROVIDER: ', spotType);
  },[spotType])

  return (
    <RouterContext.Provider value={{ spotType, setSpotType }}>
      {props.children}
    </RouterContext.Provider>
  );
}
