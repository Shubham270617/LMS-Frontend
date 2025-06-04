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
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();  
  useEffect(() => {
    dispatch(getUser());
    dispatch(fetchAllBooks());
    if (isAuthenticated && user?.role === 'User') {
      dispatch(fetchUserBorrowedBooks());
    }
    if (isAuthenticated && user?.role === 'Admin') {
      dispatch(fetchAllUsers());
      dispatch(fetchAllBorrowedBooks())
    }
  }, [isAuthenticated]);
  

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
      <ToastContainer
  theme="colored"
  // style={{ zIndex: 99999 }} // very high
  // position="top-right" // or "bottom-right" if you prefer
/>
    </Router>
  );
};

export default App;
