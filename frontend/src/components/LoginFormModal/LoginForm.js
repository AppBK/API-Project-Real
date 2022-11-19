import { useState, useContext } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import '../../context/Modal.css';
import './Login.css';
import { useHistory, useLocation } from 'react-router-dom';
import { RouterContext } from "../../context/RouterContext";


export default function LoginForm({ onClose, render }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  // const [showModal, setShowModal] = useState(true);
  const { showModal, setShowModal } = useContext(RouterContext);

  const location = useLocation();
  const currentURL = location.pathname;

  const closeModal = () => {
    setShowModal(false);
    // history.push(currentURL);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.thunkUserLogin({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  const handleDemo = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.thunkUserLogin({ credential: 'Demo-lition', password: 'password' })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <>
      {showModal && (
        <>
        <div id="modal-background" onClick={onClose} /> {/* makes the background dark.. from: import '../../context/Modal.css';*/}
        <div id="outer-modal-div-flex">
          <div id="div-flex-upper-sliver">
            <button id="the-closer" onClick={() => closeModal()}>X</button>
            <div id="login-signup">Login or sign up</div>
          </div>
          <div id="lower-portion">
            <form id="form-flex" onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <ul>
                {errors.map((error, idx) => (
                  <li key={idx}>{error}</li>
                ))}
              </ul>
              <h3 id="welcome">Welcome to Airbnb</h3>
                <div id="combined-input-flex">
                  <input
                    type="text"
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
                    required
                    placeholder="Username or Email"
                    className="siamese-input-boxes"
                    id="siamese-top"
                  />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Password"
                    className="siamese-input-boxes"
                    id="siamese-bottom"
                  />
                </div>
                <button type="submit" id="login-button">Log In</button>
                <button onClick={handleDemo} id="demo-user-button">Demo User</button>
            </form>
        </div>
      </div>
    </>
  )}
  </>
  );
}


/*
  <div id="modal-background" onClick={onClose} />
    <div id="div-flex-upper-sliver">
      <button><svg>X</svg></button>
      <div>Log in or sign up</div>
    </div>
    <div id="lower-portion">
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <h3>Welcome to Airbnb</h3>
        <div id="combined-input-flex">
          <input/>
          <input/>
        </div>

    </div>
*/
