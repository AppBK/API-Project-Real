import { Modal } from "../../context/Modal";
import { useState, useEffect, useContext } from 'react';
import { RouterContext } from '../../context/RouterContext';
import '../../context/Modal.css';
import CreateReview from "./CreateReview";
import { ModalContext } from "../../context/Modal";
import { useSelector } from "react-redux";

export default function CreateReviewModal({ spot, isLoaded }) {
  const { showCreateReview, setShowCreateReview } = useContext(RouterContext);
  const { setShowModal } = useContext(ModalContext);
  const session = useSelector(state => state.session);

  return (
    <>
    {session.user && (
    <div id="do-you-even-lift">
      <button id="review-modal-button" className="spotButtons" onClick={() => setShowCreateReview(true)}>Review</button>
      {showCreateReview && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateReview spot={spot}/>
        </Modal>
      )}
      </div>)}
  </>
  );
}


