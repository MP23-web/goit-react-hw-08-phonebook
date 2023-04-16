import { createSlice } from '@reduxjs/toolkit';
import {
  fetchContacts,
  addContact,
  deleteContact,
  logout,
} from 'redux/thunks/operations.js';

const itemsSlice = createSlice({
  name: 'items',
  initialState: {
    contacts: [],
    isLoading: false,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = action.payload;
      })
      .addCase(fetchContacts.rejected, state => {
        state.isLoading = false;
      })
      .addCase(addContact.pending, state => {
        state.isLoading = true;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts.unshift(action.payload);
      })
      .addCase(addContact.rejected, state => {
        state.isLoading = false;
      })
      .addCase(deleteContact.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = state.contacts.filter(el => el.id !== action.payload);
      })
      .addCase(deleteContact.rejected, state => {
        state.isLoading = false;
      })
      .addCase(logout.pending, state => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, state => {
        state.contacts = [];
        state.isLoading = false;
      })
      .addCase(logout.rejected, state => {
        state.isLoading = false;
      });
  },
});

export const itemsReducer = itemsSlice.reducer;