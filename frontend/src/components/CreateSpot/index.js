import { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Modal } from '../../context/Modal';
import { RouterContext } from '../../context/RouterContext';
import '../../context/Modal.css';
import CreateASpot from './CreateSpot';
import './CreateSpot.css';

export default function CreateASpotModal() {
  const { showCreateSpot, setShowCreateSpot } = useContext(RouterContext);

  return (
    <div>
      <button id="edit-modal-create-button"  onClick={() => setShowCreateSpot(true)}
        // style={{backgroundColor: "transparent", color: "black", fontSize: "14px", marginTop: "16px", border: "none", marginRight: "32px", display: "block"}}
      >Become a Host</button>
      {showCreateSpot && (
        <Modal onClose={() => setShowCreateSpot(false)}>
          <CreateASpot />
        </Modal>
      )}
    </div>
  );
}


/*
#edit-modal-create-button {
  background: transparent;
  color: black;
  font-size: 14px;
  margin-top: 16px;
}

#edit-modal-create-button:hover {
  cursor: pointer;
  background-color: rgb(221,221,221);
}
*/
