import React, { useState, useEffect, useContext } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import LogoutModal from '../LogoutModal';
import { RouterContext } from '../../context/RouterContext';
import { thunkLogoutUser } from '../../store/session';
import { useSelector } from 'react-redux';
import { actionClearStore } from '../../store/singleSpot';
import { actionSpotsDump } from '../../store/spot';
import { useHistory } from 'react-router-dom';
import './Profile.css';


function ProfileButton({ user }) {
  const { showModal, setShowModal } = useContext(RouterContext);
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const currentUser = useSelector(state => state.session.user);

  const openMenu = () => {
    console.log('SETTING SHOW MODAL')
    setShowMenu(!showMenu);
  };

  // For user icon modal buttons
  const redirectToSplangyIt = () => {
    history.push('/splangyit');
  }


  // Should be actionUserDelete?...
  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogoutUser(currentUser));
    // dispatch(actionClearStore());
    // dispatch(actionSpotsDump());
    setShowModal(false);
    history.push('/');
  };

  return (
    <>
      <div className="user-icon-button pointer" onClick={openMenu}>
        <div className="list-icon-div">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{display: "block", fill: "none", height: "16px", width: "16px", stroke: "currentcolor", strokeWidth: "3", overflow: "visible"}}><g fill="none" fillRule="nonzero"><path d="m2 16h28" /><path d="m2 24h28" /><path d="m2 8h28" /></g></svg>
        </div>
        <div className="user-icon-div">
          <svg  className="user-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{display: "block", color: "#717171", height: "100%", width: "100%", fill: "currentcolor"}}><path d="m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z" /></svg>
        </div>
        {showMenu && (
        <div id="user-icon-button-modal">
          <div id="user-icon-modal-middle">
            <div className="user-icon-modal-buttons" onClick={redirectToSplangyIt}><div>Splangybnb your home</div></div>
          </div>
          <div id="user-icon-modal-bottom">
            <div className="user-icon-modal-buttons" onClick={logout}><div>Logout</div></div>
          </div>
        </div>)}
      </div>
    </>
  );
}

export default ProfileButton;
