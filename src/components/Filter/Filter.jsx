import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from 'redux/slices/filterSlice';
import s from './Filter.module.css';

export const Filter = () => {
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();
  const handleChangeFilter = e => dispatch(setFilter(e.target.value));

  return (
    <>
      <label htmlFor="findByName">Find contacts by name</label>
      <input
        id="findByName"
        className={s.filter}
        type="text"
        name="name"
        placeholder="Search contact"
        onChange={handleChangeFilter}
        value={filter}
      />
    </>
  );
};