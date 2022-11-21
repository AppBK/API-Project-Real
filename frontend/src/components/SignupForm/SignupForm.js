import { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { thunkSignupUser } from '../../store/session';
import './SignupForm.css';
import '../../context/Modal.css';
import { Modal } from '../../context/Modal';
import { RouterContext } from '../../context/RouterContext';

export default function SignupForm() {
  // Component Slices of State
  const [showModal, setShowModal] = useState(true);
  const [showSignUp, setShowSignUp] = useState('hidden');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [errors, setErrors] = useState([]);

  const history = useHistory();
  const dispatch = useDispatch();
  const { showSignupForm, setShowSignupForm } = useContext(RouterContext);

  const sessionUser = useSelector((state) => state.session.user);

  if (sessionUser) return (<Redirect to="/" />);

  useEffect(() => {
    const err = [];

    if (username.length > 50) err.push('Username must be 50 chars or less');
    if (firstName.length > 50) err.push('First Name must be 50 chars or less');
    if (lastName.length > 50) err.push('Last Name must be 50 chars or less');
    if (!password.length) ;
    else if (password.length < 8) err.push('Password must be at least 8 chars in length');
    if (confirmPassword !== password) err.push('Passwords must match!');

    setErrors(err);
  },[username, email, password, confirmPassword, firstName, lastName]);

  const onSubmit = (e) => {
    e.preventDefault();

    const body = {
      username,
      firstName,
      lastName,
      email,
      password
    }

    if (errors.length) return;

    dispatch(thunkSignupUser(body))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          errors.push(data.errors);
          alert(data.errors)
        }
      });

    if (errors.length === 0) {
      setUsername('');
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setErrors([]);
      setShowSignupForm(false);

      history.push("/");
    }
  }

  return (
    <>
      <div id="modal-background" onClick={() => setShowModal(false)} /> {/* makes the background dark.. from: import '../../context/Modal.css';*/}
      <div id="signup-outer">
        <div id="div-flex-upper-sliver">
          <button id="the-closer" onClick={() => setShowSignupForm(false)}>X</button>
          <div id="signup-label">Sign up</div>
        </div>
        <div id="lower-portion">
          <form id="form-flex" onSubmit={(e) => onSubmit(e)} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <ul>
              {errors.map((error, idx) => (
                <li key={idx} className="error-list-items">{error}</li>
              ))}
            </ul>
            <div id="siamese-inputs-rev">
              <input id="siamese-top" className="siamese-input-boxes" type="text" name="review-input" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required></input>
              <input className="siamese-input-boxes" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required></input>
              <input className="siamese-input-boxes" type="text" placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required></input>
              <input className="siamese-input-boxes" type="text" placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} required></input>
              <input className="siamese-input-boxes" type="password" name="rating-input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required></input>
              <input id="siamese-bottom" className="siamese-input-boxes" type="password" name="rating-input" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required></input>
            </div>
            <button type="submit" id="add-image-button">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
  //   <>
  //     <div className="modal-signup" visibility={showSignUp}>
  //       <button id="close-button-signup" onClick={() => history.push('/')}>X</button>
  //       <ul>
  //         {errors.map((err, idx) => (
  //           <li key={idx} className="error">{err}</li>
  //         ))}
  //       </ul>
  //       <form onSubmit={onSubmit}>
  //         <div>
  //           <label htmlFor="username">Username</label>
  //           <input type="text" name="username" onChange={(e) => setUsername(e.target.value)} value={username} placeholder="Username" required></input>
  //         </div>
  //         <div>
  //           <label htmlFor="firstname">First Name</label>
  //           <input type="text" name="firstname" onChange={(e) => setFirstName(e.target.value)} value={firstName} placeholder="First Name" required></input>
  //         </div>
  //         <div>
  //           <label htmlFor="lastname">Last Name</label>
  //           <input type="text" name="lastname" onChange={(e) => setLastName(e.target.value)} value={lastName} placeholder="Last Name" required></input>
  //         </div>
  //         <div>
  //           <label htmlFor="email">Email</label>
  //           <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Email" required></input>
  //         </div>
  //         <div>
  //           <label htmlFor="password">Password</label>
  //           <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Password" required></input>
  //         </div>
  //         <button type="submit">Sign Up</button>
  //       </form>
  //     </div>
  //   </>
  // );
}
