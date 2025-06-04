import React, { useEffect, useState } from 'react'
import { Link, Navigate, useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { resetAuthSlice, resetPassword } from '../store/slice/authSlice'
import { toast } from 'react-toastify'
import logo_lib from '../assets/logo_lib.png';
import { motion } from 'framer-motion';
import book from '../assets/book.png';


const ResetPassword = () => {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const {token} = useParams()

  const dispatch = useDispatch();

  const { loading, error, message, user, isAuthenticated } = useSelector((state) => state.auth);


  const handleResetPassword = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.set("password", password)
    formData.set("confirmPassword", confirmPassword)
    dispatch(resetPassword(formData, token))
  }


   useEffect(() => {
      if (message) {
        toast.success(message);
        dispatch(resetAuthSlice());
      }
      if (error) {
        toast.error(error);
        dispatch(resetAuthSlice());
      }
    }, [dispatch, error, isAuthenticated, loading]);
  
    if (isAuthenticated) {
      return <Navigate to={'/'} />;
    }



  return (
    <>
    <div  className="flex flex-col justify-center md:flex-row h-screen overflow-hidden bg-gradient-to-tr from-black via-gray-900 to-black">
      {/* Left Section */}
      <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="hidden w-full md:w-1/2 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-700 text-white md:flex flex-col items-center justify-center p-8 rounded-tr-[80px] rounded-br-[80px] relative overflow-hidden shadow-2xl"
        >
          <motion.div
            animate={{
              boxShadow: [
                '0 0 20px #00FFFF', // Cyan
                '0 0 25px #0080FF', // Blue
                '0 0 30px #8000FF', // Purple
                '0 0 25px #FF00FF', // Pink
                '0 0 20px #00FFFF', // Back to Cyan
              ],
              borderColor: ['#00FFFF', '#0080FF', '#8000FF', '#FF00FF', '#00FFFF'],
            }}
            transition={{
              duration: 8,
              ease: 'linear',
              repeat: Infinity,
              repeatType: 'loop',
            }}
            className="absolute inset-0 border-2 border-cyan-300 pointer-events-none"
          />
          <motion.div
            className="relative z-10 flex flex-col items-center justify-center min-h-[750px] overflow-visible"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
          >
            <motion.img
              src={logo_lib}
              alt="logo"
              className="h-48 w-auto mb-12 drop-shadow-glow"
              animate={{ y: [0, -30, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
              whileHover={{ scale: 1.1 }}
            />
            <motion.h3
              className="max-w-[400px] mx-auto text-xl font-bold leading-relaxed px-4 text-center tracking-wide drop-shadow-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
              style={{
                background:
                  'linear-gradient(270deg, #60a5fa, #818cf8, #a78bfa, #f472b6, #facc15, #60a5fa)',
                backgroundSize: '1200% 1200%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'gradientShift 10s ease infinite',
              }}
            >
              "Your premier digital library for effortless borrowing and immersive reading.
              Discover, borrow and enjoy — your library experience transforms your way anytime,
              anywhere."
            </motion.h3>
          </motion.div>
        </motion.div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 overflow-y-auto h-screen relative">
      
          {/* Back Button (Mobile Only) */}
          <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute top-5 left-5 md:hidden overflow-hidden"
        >
          <Link
            to={"/password/forgot/"}
            className="border-2 border-cyan-300 text-cyan-300 rounded-full px-4 py-2 text-sm bg-transparent hover:bg-cyan-300 hover:text-black transition-all duration-300 shadow-md hover:shadow-cyan-400/50"
          >
            Back
          </Link>
        </motion.div>
      
        {/* Main Card */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="w-full max-w-sm bg-opacity-60 backdrop-blur-md rounded-2xl shadow-[0_0_30px_cyan] sm:p-8 p-6 relative h-[650px]"
        >
          {/* Glowing Outer Border */}
          <motion.div
            animate={{ opacity: [0.8, 0.4, 0.8] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
            className="absolute inset-0 border-2 border-cyan-300 rounded-xl pointer-events-none"
          />
      
          {/* Floating Image First */}
          <motion.div
            className="flex justify-center mb-10 overflow-hidden"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.img
              src={book}
              alt="Book"
              className="h-[180px] w-[180px] object-cover"
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 2,
                ease: 'easeInOut',
                repeat: Infinity,
              }}
            />
          </motion.div>
      
          {/* Heading Second */}
          <motion.h1
            className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text text-center mb-6 overflow-hidden"
            style={{
              backgroundImage: 'linear-gradient(to right, #6366f1, #a855f7, #ec4899)',
              backgroundSize: '200% auto',
              WebkitTextFillColor: 'transparent',
            }}
            animate={{ backgroundPosition: ['0% center', '100% center'] }}
            transition={{ duration: 2, ease: 'linear', repeat: Infinity }}
          >
           Reset Password
          </motion.h1>
      
          {/* Subtext */}
          <motion.p
            className="text-center mb-10 text-lg font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
            animate={{ opacity: [0.7, 1, 0.7], scale: [0.98, 1.02, 0.98] }}
            transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity }}
          >
            Please enter your new password
          </motion.p>
      
          {/* Forgot Password Form */}
          <motion.form
            onSubmit={handleResetPassword}
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { staggerChildren: 0.2 },
              },
            }}
          >
            {/* Email Input */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
              className="mb-6 overflow-hidden"
            >
              <motion.input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                whileFocus={{ scale: 1.02 }}
                className="w-full px-4 py-3 border-2 border-cyan-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all bg-black text-white placeholder-cyan-400 mb-3"
              />

<motion.input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                whileFocus={{ scale: 1.02 }}
                className="w-full px-4 py-3 border-2 border-cyan-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all bg-black text-white placeholder-cyan-400"
              />
            </motion.div>
      
            {/* Reset Password Button */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
              className="flex justify-center w-full overflow-hidden"
            >
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative inline-flex overflow-hidden items-center justify-center px-8 py-3 text-lg font-semibold text-white rounded-full shadow-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-transform duration-300 ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {/* Glowing Background Animation */}
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
      
                {/* Border Glow */}
                <motion.div
                  animate={{ opacity: [0.5, 0.7, 0.5] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                  className="absolute inset-0 border-2 border-cyan-300 rounded-full pointer-events-none"
                />
      
                <span className="relative z-10">{loading ? 'Loading...' : 'RESET PASSWORD'}</span>
              </motion.button>
            </motion.div>
          </motion.form>
      
        </motion.div>
      </div>
    </div>
    
    
    
    
    
    
    
    
    
    
    </>
  )
}

export default ResetPassword