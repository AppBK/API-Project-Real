import { useState, createContext, useEffect } from 'react';

export const RouterContext = createContext();

export const RouterProvider = props => {
  const [spotType, setSpotType] = useState('BeachFront');
  const [spotsRetrieved, setSpotsRetrieved] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAddImage, setShowAddImage] = useState(false);
  const [showEditSpot, setShowEditSpot] = useState(false);
  const [showCreateSpot, setShowCreateSpot] = useState(false);
  const [showCreateReview, setShowCreateReview] = useState(false);
  const [showEditReview, setShowEditReview] = useState(false);
  const [prevType, setPrevType] = useState('');
  const [dumpStore, setDumpStore] = useState(true);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [userCity, setUserCity] = useState('');
  const [locationServicesEnabled, setLocationServicesEnabled] = useState(true);
  const [modalId, setModalId] = useState('');

  return (
    <RouterContext.Provider value={{
      spotType, setSpotType,
      spotsRetrieved, setSpotsRetrieved,
      showModal, setShowModal,
      showAddImage, setShowAddImage,
      showEditSpot, setShowEditSpot,
      showCreateSpot, setShowCreateSpot,
      showCreateReview, setShowCreateReview,
      showEditReview, setShowEditReview,
      prevType, setPrevType,
      dumpStore, setDumpStore,
      showSignupForm, setShowSignupForm,
      userCity, setUserCity,
      locationServicesEnabled, setLocationServicesEnabled,
      modalId, setModalId,
    }}>
      {props.children}
    </RouterContext.Provider>
  );
}
