import { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Modal } from '../../context/Modal';
import { RouterContext } from '../../context/RouterContext';
import '../../context/Modal.css';
import EditSpot from './EditSpot';

export default function EditSpotModal() {
  const { showEditSpot, setShowEditSpot, setShowModal } = useContext(RouterContext);

  return (
    <div id='generic'>
      <button id="edit-modal-button" className="spotButtons" onClick={() => setShowEditSpot(true)}>Edit</button>
      {showEditSpot && (
        <Modal onClose={() => setShowModal(false)}>
          <EditSpot />
        </Modal>
      )}
    </div>
  );
}

// const [showEditSpot, setShowEditSpot] = useState(false);
