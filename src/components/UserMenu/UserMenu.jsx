import { useSelector, useDispatch } from 'react-redux';
import { logout } from 'redux/thunks/operations';
import s from './UserMenu.module.css';

export const UserMenu = () => {
  const name = useSelector(state => state.auth.name);
  const dispatch = useDispatch();

  return (
    <div className={s.menu}>
      <p className={s.name}>{name}</p>
      <button
        type="button"
        onClick={() => dispatch(logout())}
        className={s.btn}
      >
        Sign Out
      </button>
    </div>
  );
};