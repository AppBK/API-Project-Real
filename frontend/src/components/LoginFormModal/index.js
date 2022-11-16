import { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import { RouterContext } from '../../context/RouterContext';

export default function LoginFormModal({ render }) {
  // const [showModal, setShowModal] = useState(false);
  // const location = useLocation();
  // const currentURL = location.pathname;
  const { showModal, setShowModal } = useContext(RouterContext);

  return (
    <>
      <button id="login-center-console" onClick={() => setShowModal(true)} className="navlink pointer"><div id="login-border"></div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Log In</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm render={render}/>
        </Modal>
      )}
    </>
  );
}

{/* <li className="user-menu-li">
  <NavLink id="login-center-console" to="/login" className="navlink">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Log In&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</NavLink>
</li> */}
