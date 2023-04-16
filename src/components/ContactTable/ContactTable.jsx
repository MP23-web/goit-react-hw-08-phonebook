import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { deleteContact, fetchContacts } from 'redux/thunks/operations';
import s from './ContactTable.module.css';

export const ContactTable = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.items.contacts);
  const filter = useSelector(state => state.filter);

  const filteredContacts = contacts.filter(item =>
    item.name.toLowerCase().includes(filter)
  );

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      {filteredContacts.length === 0 ? (
        <p className={s.message}>There is no contact</p>
      ) : (
        <table className={s.contactListTable}>
          <thead className={s.thead}>
            <tr>
              <th>Name</th>
              <th>Number</th>
              <th></th>
            </tr>
          </thead>
          <tbody className={s.tbody}>
            {filteredContacts?.map(({ id, name, number }) => {
              return (
                <tr key={id}>
                  <td>{name} </td>
                  <td>{number}</td>
                  <td>
                    <button onClick={() => dispatch(deleteContact(id))}>
                      delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};