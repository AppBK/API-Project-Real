import { useState } from 'react';
import { thunkUserLogin } from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';


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

    console.log(creds);

    return dispatch(thunkUserLogin(creds))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label>
          Username or Email
          <input type="text" value={cred} onChange={(e) => setCred(e.target.value)} required/>
        </label>
        <label>
          Password
          <input type="text" value={pass} onChange={(e) => setPass(e.target.value)} required/>
        </label>
        <button>Log In</button>
      </form>
    </div>
  );
}
