import { useState, createContext, useEffect } from 'react';

export const RouterContext = createContext();

export const RouterProvider = props => {
  const [spotType, setSpotType] = useState('BeachFront');
  const [spotsRetrieved, setSpotsRetrieved] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAddImage, setShowAddImage] = useState(false);

  useEffect(() => {
    console.log('SPOT TYPE FROM PROVIDER: ', spotType);
  },[spotType])

  return (
    <RouterContext.Provider value={{ spotType, setSpotType, spotsRetrieved, setSpotsRetrieved, showModal, setShowModal, showAddImage, setShowAddImage }}>
      {props.children}
    </RouterContext.Provider>
  );
}
