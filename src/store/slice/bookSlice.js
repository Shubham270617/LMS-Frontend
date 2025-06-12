import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toggleAddBookPopup } from './popUpSlice';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../components/config';

// Helper to safely extract error messages
const getErrorMessage = (err) =>
  err.response?.data?.message || err.message || "Something went wrong";

const bookSlice = createSlice({
  name: 'book',
  initialState: {
    loading: false,
    error: null,
    message: null,
    books: [],
  },
  reducers: {
    fetchBooksRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    fetchBooksSuccess(state, action) {
      state.loading = false;
      state.books = action.payload;
    },
    fetchBooksFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    addBookRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addBookSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    addBookFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    resetBookSlice(state) {
      state.loading = false;
      state.error = null;
      state.message = null;
    },
  },
});

export const fetchAllBooks = () => async (dispatch) => {
  dispatch(bookSlice.actions.fetchBooksRequest());
  try {
    const res = await axios.get(`${BASE_URL}api/v1/book/all`, {
      withCredentials: true,
    });
    dispatch(bookSlice.actions.fetchBooksSuccess(res.data.books));
  } catch (err) {
    dispatch(bookSlice.actions.fetchBooksFailed(getErrorMessage(err)));
  }
};

export const addBook = (data) => async (dispatch) => {
  dispatch(bookSlice.actions.addBookRequest());
  try {
    const res = await axios.post(`${BASE_URL}api/v1/book/admin/add`, data, {
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    dispatch(bookSlice.actions.addBookSuccess(res.data.message));
    toast.success(res.data.message);
    dispatch(fetchAllBooks());
    dispatch(toggleAddBookPopup());
  } catch (err) {
    dispatch(bookSlice.actions.addBookFailed(getErrorMessage(err)));
  }
};

export const resetBookSlice = () => (dispatch) => {
  dispatch(bookSlice.actions.resetBookSlice());
};

export default bookSlice.reducer;
