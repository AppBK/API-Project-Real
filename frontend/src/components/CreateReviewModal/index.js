import { Modal } from "../../context/Modal";
import { useState, useEffect, useContext } from 'react';
import { RouterContext } from '../../context/RouterContext';
import '../../context/Modal.css';
import CreateReview from "./CreateReview";

export default function CreateReviewModal({ spot }) {
  const { showCreateReview, setShowCreateReview } = useContext(RouterContext);

  return (
    <div id='generic'>
      <button id="review-modal-button" className="spotButtons" onClick={() => setShowCreateReview(true)}>Review</button>
      {showCreateReview && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateReview spot={spot}/>
        </Modal>
      )}
    </div>
  );
}
