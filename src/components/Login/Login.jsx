import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { login } from 'redux/thunks/operations';
import s from './Login.module.css';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.auth.isAuth);

  const inputOperator = e => {
    switch (e.target.name) {
      case 'email':
        setEmail(e.target.value);
        break;
      case 'password':
        setPassword(e.target.value);
        break;
      default:
        throw new Error('Unexpected value');
    }
  };

  const formSubmit = e => {
    e.preventDefault();
    dispatch(login({ email, password }));
    setEmail('');
    setPassword('');
  };

  if (!isAuth) {
    return (
      <form onSubmit={formSubmit} className={s.form}>
        <label className={s.label}>
          Email
          <input
            type="email"
            name="email"
            required
            value={email}
            onChange={inputOperator}
            className={s.input}
          />
        </label>
        <label className={s.label}>
          Password
          <input
            type="password"
            name="password"
            required
            value={password}
            onChange={inputOperator}
            className={s.input}
          />
        </label>
        <button type="submit" className={s.button}>
          Log in
        </button>
      </form>
    );
  } else {
    return <Navigate to="/contacts" replace={true} />;
  }
};