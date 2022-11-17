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
    <div id='generic'>
      <button id="edit-modal-create-button" className="spotButtons" onClick={() => setShowCreateSpot(true)}>Become a Host</button>
      {showCreateSpot && (
        <Modal onClose={() => setShowCreateSpot(false)}>
          <CreateASpot />
        </Modal>
      )}
    </div>
  );
}
