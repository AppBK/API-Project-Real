import { useState } from 'react';
import { Modal } from '../../context/Modal';
import Logout from './Logout';

const LogoutModal = ({ user, logout }) => {
  const [showModal, setShowModal] = useState(true);
  console.log('Kinda Open')

  return (
    <>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <Logout user={user} logout={logout}/>
        </Modal>
      )}
    </>
  );
}

export default LogoutModal;
