import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { UserMenu } from 'components/UserMenu/UserMenu';
import s from './NavBar.module.css';

export const NavBar = () => {
  const isAuth = useSelector(state => state.auth.isAuth);

  return (
    <header className={s.header}>
      <Link to="/" className={s.home}>
        Home
      </Link>
      <div className={s.navWrapper}>
        {!isAuth && (
          <NavLink to="/register" className={s.link}>
            Register
          </NavLink>
        )}
        {isAuth && (
          <NavLink to="/contacts" className={s.link}>
            Contacts
          </NavLink>
        )}
        {!isAuth && (
          <NavLink to="/login" className={s.link}>
            Log In
          </NavLink>
        )}
        {isAuth && <UserMenu />}
      </div>
    </header>
  );
};