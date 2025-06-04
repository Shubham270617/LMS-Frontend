import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { register, resetAuthSlice } from '../store/slice/authSlice';
import { toast } from 'react-toastify';
import logo_lib from '../assets/logo_lib.png';
import books from '../assets/books.png';
import { motion } from 'framer-motion';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const { loading, error, message, user, isAuthenticated } = useSelector((state) => state.auth);

  const handleRegister = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', name);
    data.append('email', email);
    data.append('password', password);
    dispatch(register(data));
  };

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(resetAuthSlice());
      navigateTo(`/otp-verification/${email}`);
    }
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
  }, [dispatch, error, isAuthenticated, loading]);

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden  bg-gradient-to-tr from-black via-gray-900 to-black">
      {/* Left Panel - Sign In */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 flex-col items-center justify-center p-8 rounded-tr-[80px] rounded-br-[80px] overflow-hidden relative"
      >
        {/* Glowing Bubble */}
        <motion.div
          className="absolute -top-20 -left-20 w-96 h-96 bg-pink-400 opacity-20 rounded-full blur-3xl z-0"
          animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
        />

        {/* Floating Logo with a Neon Glow Effect */}
        <motion.img
          src={logo_lib}
          alt="logo"
          className="h-44 w-auto mb-8 z-10"
          animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity }}
        />

        {/* Glowing Text */}
        <motion.p
          className="mb-10 text-white text-lg font-medium z-10 text-center"
          animate={{
            opacity: [1, 0.7, 1],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
          }}
        >
          Already have an account? Sign in now
        </motion.p>

        {/* Glowing Button */}
        <motion.div
          whileHover={{ scale: 1.05, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          className="z-10"
        >
          <Link
            to="/login"
            className="relative inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-white rounded-xl shadow-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
          >
            <span className="relative z-10">SIGN IN</span>
            <motion.span
              className="absolute inset-0 bg-white opacity-10 rounded-xl"
              animate={{ opacity: [0.1, 0.3, 0.1] }}
              transition={{ repeat: Infinity, duration: 3 }}
            />
          </Link>
        </motion.div>

        {/* Continuous Glowing Border Effect */}
        <motion.div
          animate={{
            boxShadow: [
              '0 0 20px #00FFFF', // Cyan
              '0 0 25px #0080FF', // Blue
              '0 0 30px #8000FF', // Purple
              '0 0 25px #FF00FF', // Pink
              '0 0 20px #00FFFF', // Back to Cyan
            ],
            borderColor: [
              '#00FFFF', // Cyan
              '#0080FF', // Blue
              '#8000FF', // Purple
              '#FF00FF', // Pink
              '#00FFFF', // Cyan
            ],
          }}
          transition={{
            duration: 8,
            ease: 'linear',
            repeat: Infinity,
            repeatType: 'loop',
          }}
          className="absolute inset-0 border-2 border-cyan-300  pointer-events-none"
        />
      </motion.div>

      {/* Right Side  */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="w-full md:w-1/2 flex items-center justify-center p-6 overflow-y-auto h-screen"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="w-full max-w-sm bg-opacity-60 backdrop-blur-md rounded-2xl shadow-[0_0_30px_cyan] sm:p-8 p-6 relative"
        >
          {/* Outer Glowing Border */}
          <motion.div
            animate={{ opacity: [0.8, 0.4, 0.8] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
            className="absolute inset-0 border-2 border-cyan-300 rounded-xl pointer-events-none"
          ></motion.div>

          {/* Heading */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex justify-center mb-10"
          >
            <div className="flex flex-col-reverse sm:flex-row items-center justify-center gap-3 sm:gap-5 overflow-hidden">
              <motion.h3
                className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text overflow-hidden"
                style={{
                  backgroundImage: 'linear-gradient(to right, #6366f1, #a855f7, #ec4899)',
                  backgroundSize: '200% auto',
                  WebkitTextFillColor: 'transparent',
                }}
                animate={{ backgroundPosition: ['0% center', '100% center'] }}
                transition={{ duration: 2, ease: 'linear', repeat: Infinity }}
              >
                Sign Up
              </motion.h3>

              {/* Floating Books Image */}
              <motion.img
                src={books}
                alt="Books"
                className="h-[100px] w-[100px] object-cover"
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 2,
                  ease: 'easeInOut',
                  repeat: Infinity,
                }}
              />
            </div>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            className="text-center mb-10 text-lg font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
            animate={{ opacity: [0.7, 1, 0.7], scale: [0.98, 1.02, 0.98] }}
            transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity }}
          >
            Please provide your information to sign up.
          </motion.p>

          {/* Registration Form */}
          <motion.form
            onSubmit={handleRegister}
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
          >
            {/* Name Input */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
              className="mb-4 overflow-hidden"
            >
              <motion.input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                whileFocus={{ scale: 1.02 }}
                className="w-full px-4 py-2 sm:py-3 border-2 border-cyan-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all bg-black text-white placeholder-cyan-400"
              />
            </motion.div>

            {/* Email Input */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
              className="mb-4 overflow-hidden"
            >
              <motion.input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                whileFocus={{ scale: 1.02 }}
                className="w-full px-4 py-3 border-2 border-cyan-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all bg-black text-white placeholder-cyan-400"
              />
            </motion.div>

            {/* Password Input */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
              className="mb-4 overflow-hidden"
            >
              <motion.input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                whileFocus={{ scale: 1.02 }}
                className="w-full px-4 py-3 border-2 border-cyan-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all bg-black text-white placeholder-cyan-400"
              />
            </motion.div>

            {/* Already have an account - Mobile */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
              className="block md:hidden text-center mb-6 px-4 overflow-hidden"
            >
              <motion.p
                className="text-center mb-5 text-lg font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                animate={{ opacity: [0.7, 1, 0.7], scale: [0.98, 1.02, 0.98] }}
                transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity }}
              >
                Already have an account?
              </motion.p>

              <motion.div
                whileHover={{ scale: 1.1, rotate: 1 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <Link
                  to="/login"
                  className="inline-block px-5 py-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold text-sm shadow-lg hover:from-cyan-500 hover:to-blue-600 transition-all duration-300"
                >
                  Sign In
                </Link>
              </motion.div>
            </motion.div>

            {/* Sign Up Button */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
              className="flex justify-center w-full overflow-hidden"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={loading}
                className={`relative inline-flex overflow-hidden items-center justify-center px-8 py-3 text-lg font-semibold text-white rounded-full shadow-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-transform duration-300 ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {/* Glowing Background */}
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 opacity-20 blur-md z-[-1]"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.8, 0.4, 0.8],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: 'easeInOut',
                  }}
                />
                {/* Glowing Border */}
                <motion.div
                  animate={{ opacity: [0.5, 0.7, 0.5] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                  className="absolute inset-0 border-2 border-cyan-300 rounded-full pointer-events-none"
                ></motion.div>

                <span className="relative z-10">{loading ? 'Loading...' : 'SIGN UP'}</span>
              </motion.button>
            </motion.div>
          </motion.form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Register;
