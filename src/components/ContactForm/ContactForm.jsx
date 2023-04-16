import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/thunks/operations';
import { toast } from 'react-toastify';
import s from './ContactForm.module.css';

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const contacts = useSelector(state => state.items.contacts);
  const dispatch = useDispatch();

  const handleChangeData = e => {
    switch (e.target.name) {
      case 'name':
        setName(e.target.value);
        break;
      case 'number':
        setNumber(e.target.value);
        break;
      default:
    }
  };

  const submitData = e => {
    e.preventDefault();

    contacts.some(
      ({ name: currentName }) =>
        currentName.toLowerCase() === name.toLowerCase()
    )
      ? toast.info(`a contact with the name ${name} already exists`)
      : dispatch(addContact({ name, number }));
    setName('');
    setNumber('');
  };

  return (
    <>
      <form className={s.form} action="submit" onSubmit={submitData}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          placeholder="Enter a name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={handleChangeData}
          value={name}
        />

        <label htmlFor="number">Number</label>
        <input
          id="number"
          type="text"
          name="number"
          placeholder="Enter a number"
          pattern="^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$"
          title="This field may contain numbers"
          required
          onChange={handleChangeData}
          value={number}
        />
        <button type="submit">Add contact to the list</button>
      </form>
    </>
  );
};