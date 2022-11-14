import { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import '../../context/Modal.css';
import './Login.css';
import { useHistory } from 'react-router-dom';

export default function LoginForm({ onClose, render }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [showModal, setShowModal] = useState(true);

  const closeModal = () => {
    setShowModal(false);
    history.push('/');
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



  return (
    <>
      {showModal && (
        <>
        <div id="modal-background" onClick={onClose} />
        <div id="modal-content">
          <button id="close-button-login" onClick={render()}>X</button>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <ul>
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
            <label>Username or Email</label>
              <input
                type="text"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                required
              />
            <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            <button type="submit">Log In</button>
          </form>
      </div>
    </>
  )}
  </>
  );
}
