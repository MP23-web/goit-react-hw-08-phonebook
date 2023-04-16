import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { register } from 'redux/thunks/operations';
import s from './Register.module.css';

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isAuth = useSelector(state => state.auth.isAuth);
  const dispatch = useDispatch();

  const inputOperator = e => {
    switch (e.target.name) {
      case 'name':
        setName(e.target.value);
        break;
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
    dispatch(register({ name, email, password }));
    setName('');
    setEmail('');
    setPassword('');
  };

  if (!isAuth) {
    return (
      <form onSubmit={formSubmit} className={s.form}>
        <label className={s.label}>
          Username
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces.
                    For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
            onChange={inputOperator}
            className={s.input}
          />
        </label>
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
          Register
        </button>
      </form>
    );
  } else {
    return <Navigate to="/contacts" replace={true} />;
  }
};