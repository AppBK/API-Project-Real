import { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Modal } from '../../context/Modal';
import { RouterContext } from '../../context/RouterContext';
import '../../context/Modal.css';
import EditSpot from './EditSpot';

export default function EditSpotModal({ spot }) {
  const { showEditSpot, setShowEditSpot, setShowModal } = useContext(RouterContext);

  return (
    <div>
      <button className="spotButtons" onClick={() => setShowEditSpot(true)}>Edit</button>
      {showEditSpot && (
        <Modal onClose={() => setShowModal(false)}>
          <EditSpot spot={spot}/>
        </Modal>
      )}
    </div>
  );
}

// const [showEditSpot, setShowEditSpot] = useState(false);
