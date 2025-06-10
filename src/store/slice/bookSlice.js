import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toggleAddBookPopup } from './popUpSlice';
import { toast } from 'react-toastify';

const bookSlice = createSlice({
  name: 'book',
  initialState: {
    loading: false,
    error: null,
    message: null,
    books: [],
  },
  reducers: {
    // Fetch Books
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

    // Add Book
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

    // Book Slice
    resetBookSlice(state) {
      state.loading = false;
      state.error = null;
      state.message = null;
    },
  },
});

export const fetchAllBooks = () => async (dispatch) => {
  dispatch(bookSlice.actions.fetchBooksRequest());
  await axios
    .get('https://lms-backend-beryl-nine.vercel.app//api/v1/book/all', { withCredentials: true })
    .then((res) => {
      dispatch(bookSlice.actions.fetchBooksSuccess(res.data.books));
    })
    .catch((err) => {
      dispatch(bookSlice.actions.fetchBooksFailed(err.response.data.message));
    });
};


export const addBook = (data) => async (dispatch) =>{
dispatch(bookSlice.actions.addBookRequest());
  await axios
    .post('https://lms-backend-beryl-nine.vercel.app//api/v1/book/admin/add', data, {
         withCredentials: true,
            headers: {
            'Content-Type': 'multipart/form-data',
            },       
        })
    .then((res) => {
      bookSlice.actions.addBookSuccess(res.data.message);
      toast.success(res.data.message);
      dispatch(fetchAllBooks())
      dispatch(toggleAddBookPopup())
    })
    .catch((err) => {
      dispatch(bookSlice.actions.addBookFailed(err.response.data.message));
    });
};

export const resetBookSlice = () =>(dispatch) =>{
dispatch(bookSlice.actions.resetBookSlice())
}

export default bookSlice.reducer;