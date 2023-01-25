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
    <div id="your-home">
      <button id="edit-modal-create-spot-button"  onClick={() => setShowCreateSpot(true)}
        // style={{backgroundColor: "transparent", color: "black", fontSize: "14px", marginTop: "16px", border: "none", marginRight: "32px", display: "block"}}
      >Splangybnb your home</button>
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
