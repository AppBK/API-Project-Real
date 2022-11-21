import { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Modal } from '../../context/Modal';
import { RouterContext } from '../../context/RouterContext';
import SignupForm from './SignupForm';

export default function SignupFormModal({ render }) {
  // const [showModal, setShowModal] = useState(false);
  // const location = useLocation();
  // const currentURL = location.pathname;
  const { showModal, setShowModal, showSignupForm, setShowSignupForm } = useContext(RouterContext);

  return (
    <>
      <button id="signup-center-console" onClick={() => setShowSignupForm(true)} className="navlink pointer"><div id="login-border"></div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sign up</button>
      {showSignupForm && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupForm render={render} />
        </Modal>
      )}
    </>
  );
}

// email, username, password, firstName, lastName
