import { useState } from 'react';
import { thunkUserLogin } from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginForm.css';


export default function LoginFormPage() {
  const [cred, setCred] = useState('');
  const [pass, setPass] = useState('');
  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  if (sessionUser) return ( <Redirect to="/" /> );

  const onSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

    const creds = {
      credential: cred,
      password: pass
    }

    return dispatch(thunkUserLogin(creds))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  return (
    <div>
      <h2>User Login</h2>
      <form onSubmit={onSubmit}>
        <fieldset className="login-box">
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label>Username or Email</label>
        <input type="text" value={cred} onChange={(e) => setCred(e.target.value)} required/>
          <label>Password</label>
          <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} required/>
        <button>Log In</button>
        </fieldset>
      </form>
    </div>
  );
}
