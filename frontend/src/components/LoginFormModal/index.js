import { useState, useEffect } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';

export default function LoginFormModal({ render }) {
  const [showModal, setShowModal] = useState(false);

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
