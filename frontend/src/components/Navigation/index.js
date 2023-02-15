import { NavLink, useHistory, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import LoginFormModal from '../LoginFormModal';
import { useState, useContext, useEffect } from 'react';
import { RouterContext } from '../../context/RouterContext';
import CreateASpotModal from '../CreateSpot';
import SignupFormModal from '../SignupForm';

export default function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const [render, setRender] = useState(false);
  const { showModal, setShowModal } = useContext(RouterContext);
  const [resetHome, setResetHome] = useState(true);

  const history = useHistory();
  // const navigate = useNavigate();

  function splangyIt() {
    history.push('/splangyit');
  }

  const goHome = () => {
    setResetHome(!resetHome);
    history.push('/');
  }

  const comingSoon = () => {
    history.push('/coming');
  }

  useEffect(() => {
    console.log('Got a re-render!');
  },[showModal, resetHome]);


  let loggedInMenu;
  let sessionLinks;
  if (sessionUser) {
    loggedInMenu = (
      <ProfileButton user={sessionUser} />
    );
    sessionLinks = null;
  } else {
    sessionLinks = (
      <>
        {/* <li className="user-menu-li">
          <NavLink id="login-center-console" to="/login" className="navlink">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Log In&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</NavLink>
        </li> */}
        <LoginFormModal render={() => setRender(true)}/>
        <li className="user-menu-li pointer">
          <SignupFormModal id="signup-center-console" to="/signup" className="navlink"><div id="login-border"></div>&nbsp;&nbsp;&nbsp;&nbsp;    Sign Up</SignupFormModal>
        </li>
      </>
    );
  }


  const testMaps = () => {
    history.push('/tester');
  }


  return (
    <div className="nav-container">
      <div className="airbnb-logo">
        <img id="splangy-logo" color="#FF385C" src="/general/For_Web/png/logo-trans.png" style={{ width: "200px" }} onClick={goHome}></img>
     </div>
      {/* <div>
        <button onClick={testMaps}>Test Maps</button>
      </div> */}
      <div className="center-console-container center-content">
        <ul className="center-console">
          <li className="user-menu-li pointer">
            <button id="home-button" onClick={goHome}>Home</button>
          </li>
          {isLoaded && sessionLinks}
          <div className="search-icon-container">
            <div className="search-icon pointer">
              <button id="search-button-actual" onClick={comingSoon}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{display: "block", fill: "white", color: "white", height: "12px", width: "12px", stroke: "currentcolor", strokeWidth: 5.33333, overflow: "visible"}}><g fill="none"><path d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9" /></g></svg>
              </button>
            </div>
          </div>
        </ul>
      </div>
      <div className="nav-right">
        {sessionUser && (
          <div>
            <button id="edit-modal-create-spot-button" onClick={() => splangyIt()}
            // style={{backgroundColor: "transparent", color: "black", fontSize: "14px", marginTop: "16px", border: "none", marginRight: "32px", display: "block"}}
            >Splangybnb your home</button>
          </div>
        )}
        {sessionUser && loggedInMenu}
      </div>
    </div>
  );
}
