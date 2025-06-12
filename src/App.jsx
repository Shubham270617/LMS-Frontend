import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import OTP from './pages/OTP';
import ResetPassword from './pages/ResetPassword';
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './store/slice/authSlice';
import { fetchAllUsers } from './store/slice/userSlice';
import { fetchAllBooks } from './store/slice/bookSlice';
import { fetchAllBorrowedBooks, fetchUserBorrowedBooks } from './store/slice/borrowSlice';

const App = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  // Fetch user info once on mount (not repeatedly on each isAuthenticated change)
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  // Now only fetch protected data *after* user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchAllBooks());

      if (user?.role === 'User') {
        dispatch(fetchUserBorrowedBooks());
      }

      if (user?.role === 'Admin') {
        dispatch(fetchAllUsers());
        dispatch(fetchAllBorrowedBooks());
      }
    }
  }, [isAuthenticated, user?.role, dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/otp-verification/:email" element={<OTP />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
      </Routes>

      <ToastContainer theme="colored" />
    </Router>
  );
};

export default App;
