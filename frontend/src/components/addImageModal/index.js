import { useState, useEffect, useContext } from 'react';
import { Modal } from '../../context/Modal';
import { RouterContext } from '../../context/RouterContext';
import './addImage.css';
import AddImage from './addImage';
import '../../context/Modal.css';

export default function AddImageModal() {
  const { showModal, setShowModal, showAddImage, setShowAddImage } = useContext(RouterContext);

  // useEffect(() => {
  //   console.log('Time to Add an Image!')
  // }, [showAddImage]);

  return (
    <div id="add-image-modal-div">
      <button className="spotButtons" onClick={() => setShowAddImage(true)}>Add Image</button>
      {showAddImage && (
        <Modal onClose={() => setShowModal(false)}>
          <AddImage />
        </Modal>
      )}
    </div>
  );
}
