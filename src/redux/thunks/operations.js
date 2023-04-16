import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axios from 'axios';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

export const getUser = createAsyncThunk('auth/getUser', async (_, thunkAPI) => {
  const token = thunkAPI.getState().auth.token;
  if (token) {
    axios.defaults.headers.common.Authorization = token;
    try {
      const response = await axios.get('/users/current');
      return response.data;
    } catch (err) {
      toast.error(err.message);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
  return thunkAPI.rejectWithValue();
});

export const register = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }, thunkAPI) => {
    try {
      const response = await axios.post('/users/signup', {
        name,
        email,
        password,
      });
      axios.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
      toast.success('Welcome new user!');
      return response.data;
    } catch (err) {
      toast.error(
        `password (${password}) is shorter than the minimum allowed length (8)`
      );
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await axios.post('/users/login', { email, password });
      axios.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
      toast.success('Welcome!');
      return response.data;
    } catch (err) {
      toast.error(err.message);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    const response = await axios.post('/users/logout');
    axios.defaults.headers.common.Authorization = null;
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/contacts');
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/delete',
  async (id, thunkAPI) => {
    try {
      await axios.delete(`/contacts/${id}`);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async ({ name, number }, thunkAPI) => {
    try {
      const response = await axios.post('/contacts', { name, number });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);