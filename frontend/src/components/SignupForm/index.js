import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { thunkSignupUser } from '../../store/session';
import './SignupForm.css';
import '../../context/Modal.css';
import { Modal } from '../../context/Modal';

export default function SignupForm () {
  // Component Slices of State
  const [showModal, setShowModal] = useState(true);
  const [showSignUp, setShowSignUp] = useState('hidden');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [errors, setErrors] = useState([]);

  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  if (sessionUser) return ( <Redirect to="/" />);



  const onSubmit = (e) => {
    e.preventDefault();

      const body = {
        username,
        firstName,
        lastName,
        email,
        password
      }

      dispatch(thunkSignupUser(body))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });

    if (errors.length === 0) {
      setUsername('');
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setErrors([]);

      history.push("/");
    }
  }

  return (
    <Modal onClose={() => setShowModal(false)}>
      <div className="modal-signup" visibility={showSignUp}>
        <button id="close-button-signup" onClick={() => history.push('/')}>X</button>
        <ul>
          {errors.map((err, idx) => (
            <li key={idx} className="error">{err}</li>
          ))}
        </ul>
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input type="text" name="username" onChange={(e) => setUsername(e.target.value)} value={username} placeholder="Username" required></input>
          </div>
          <div>
            <label htmlFor="firstname">First Name</label>
            <input type="text" name="firstname" onChange={(e) => setFirstName(e.target.value)} value={firstName} placeholder="First Name" required></input>
          </div>
          <div>
            <label htmlFor="lastname">Last Name</label>
            <input type="text" name="lastname" onChange={(e) => setLastName(e.target.value)} value={lastName} placeholder="Last Name" required></input>
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Email" required></input>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Password" required></input>
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </Modal>
  );
}

// email, username, password, firstName, lastName
