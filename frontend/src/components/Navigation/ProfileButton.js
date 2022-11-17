import React, { useState, useEffect, useContext } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import LogoutModal from '../LogoutModal';
import { RouterContext } from '../../context/RouterContext';
import { thunkLogoutUser } from '../../store/session';
import { useSelector } from 'react-redux';

function ProfileButton({ user }) {
  const { showModal, setShowModal } = useContext(RouterContext);
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const currentUser = useSelector(state => state.session.user);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  // Should be actionUserDelete?...
  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogoutUser(currentUser));
    setShowModal(false);
  };

  return (
    <>
      <button className="user-icon-button pointer" onClick={openMenu}>
        {/* <i className="fas fa-user-circle airbnb" /> */}
        <div className="list-icon-div">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{display: "block", fill: "none", height: "16px", width: "16px", stroke: "currentcolor", strokeWidth: "3", overflow: "visible"}}><g fill="none" fillRule="nonzero"><path d="m2 16h28" /><path d="m2 24h28" /><path d="m2 8h28" /></g></svg>
        </div>
        <div className="user-icon-div">
          <svg  className="user-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{display: "block", color: "#717171", height: "100%", width: "100%", fill: "currentcolor"}}><path d="m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z" /></svg>
        </div>
      </button>
      {showMenu && (
        <LogoutModal user={user} logout={logout}/>
        // <ul className="profile-dropdown">
        //   <li className="user-menu-li">{user.username}</li>
        //   <li className="user-menu-li">{user.email}</li>
        //   <li className="user-menu-li">
        //     <button onClick={logout}>Log Out</button>
        //   </li>
        // </ul>
      )}
    </>
  );
}

export default ProfileButton;


{/* <div class="_167wsvl">
  <button type="button" class="c1grjlav crawnjq dir dir-ltr" aria-expanded="false" aria-label="Main navigation menu" data-testid="cypress-headernav-profile">
    <div class=" dir dir-ltr">
      <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; fill: none; height: 16px; width: 16px; stroke: currentcolor; stroke-width: 3; overflow: visible;">
        <g fill="none" fill-rule="nonzero">
          <path d="m2 16h28"></path>
          <path d="m2 24h28"></path>
          <path d="m2 8h28"></path>
        </g>
      </svg>
    </div>
    <div class="fp36fst dir dir-ltr">
      <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; height: 100%; width: 100%; fill: currentcolor;">
        <path d="m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z">
          </path>
      </svg>
    </div>
  </button>
</div> */}

{/* <div class="c8gkmzg dir dir-ltr">
  <span class="c1m2z0bj c1w8ohg7 dir dir-ltr">
    <img class="i1wps9q8 dir dir-ltr" src="https://a0.muscache.com/pictures/3b1eb541-46d9-4bef-abc4-c37d77e3c21b.jpg" alt="" width="24" height="24"/>
      <div class="tamhn2w dir dir-ltr">
        <span class="t1h65ots dir dir-ltr">Amazing views</span>
      </div>
  </span>
</div> */}
