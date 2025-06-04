import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login, resetAuthSlice } from '../store/slice/authSlice'
import { toast } from 'react-toastify'
import { Link, Navigate } from 'react-router-dom'
import logo_lib from "../assets/logo_lib.png";
import book from "../assets/book.png";
import { motion } from "framer-motion";


const Login = () => {
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")

const dispatch = useDispatch()

const { loading, error, message, user, isAuthenticated } = useSelector(
  (state) => state.auth
);

const handleLogin = (e) =>{
  e.preventDefault()
  const data = new FormData()
  data.append('email', email)
  data.append('password', password)

  dispatch(login(data))
  
}

useEffect(() => {
  // if (message) {
  //   toast.success(message);
  //   dispatch(resetAuthSlice());
  // }
  if (error) {
    toast.error(error);
    dispatch(resetAuthSlice());
  }
}, [dispatch, error, isAuthenticated, loading]);

if (isAuthenticated) {
  return <Navigate to={"/"} />;
}

  return (
    <>
    <div className="flex flex-col justify-center md:flex-row h-screen bg-gradient-to-tr from-black via-gray-900 to-black overflow-x-hidden overflow-y-auto">
        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="w-full md:w-1/2 flex items-center justify-center p-6 relative"
        >

          {/* Main Card */}
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            whileHover={{ scale: 1.02 }}
            className="relative w-full max-w-xs sm:max-w-sm bg-black bg-opacity-60 rounded-2xl px-6 py-8 backdrop-blur-md shadow-[0_0_30px_cyan] transition-all duration-500 overflow-hidden"
          >
            {/* Outer Glow */}
            <motion.div
              animate={{ opacity: [0.8, 0.4, 0.8] }}
              transition={{
                repeat: Infinity,
                duration: 2.5,
                ease: "easeInOut",
              }}
              className="absolute inset-0 border-2 border-cyan-200 rounded-xl pointer-events-none"
            ></motion.div>

            {/* Logo */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="flex justify-center mb-12 overflow-hidden"
            >
              <motion.div whileHover={{ scale: 1.05 }}>
                <img
                  src={logo_lib}
                  alt="logo"
                  className="h-[180px] w-auto object-contain"
                />
              </motion.div>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-4xl font-extrabold text-center mb-8 text-cyan-400 tracking-wider overflow-hidden"
            >
              Welcome Back !!
            </motion.h1>

            {/* Subtitle */}
            <motion.p
  initial={false}
  animate={{
    textShadow: [
      "0px 0px 8px #00FFFF",   // Cyan
      "0px 0px 8px #00FF7F",   // Spring Green
      "0px 0px 8px #7F00FF",   // Purple
      "0px 0px 8px #00FFFF",   // Back to Cyan
    ],
    color: [
      "#00FFFF",  // Cyan
      "#00FF7F",  // Spring Green
      "#7F00FF",  // Purple
      "#00FFFF",  // Back to Cyan
    ],
  }}
  transition={{
    duration: 6,
    repeat: Infinity,
    repeatType: "mirror",
    ease: "easeInOut",
  }}
  whileHover={{
    scale: 1.05,
    textShadow: "0px 0px 16px #00FFFF",
    color: "#FFFFFF",  // Bright white on hover
  }}
  className="text-center mb-12 text-lg md:text-xl font-semibold tracking-wide"
>
  Please enter your credentials to access your account.
</motion.p>

            {/* OTP Form */}
            <form onSubmit={handleLogin}>
              {/* OTP Input */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-6 overflow-hidden"
              >
                <motion.input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                  whileFocus={{ scale: 1.05, boxShadow: "0 0 20px #00FFFF" }}
                  whileHover={{ scale: 1.03 }}
                  className="w-full px-6 py-4 border-2 border-cyan-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-black text-white placeholder-cyan-400 text-center text-lg transition-all duration-300"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-6 overflow-hidden"
              >
                <motion.input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  whileFocus={{ scale: 1.05, boxShadow: "0 0 20px #00FFFF" }}
                  whileHover={{ scale: 1.03 }}
                  className="w-full px-6 py-4 border-2 border-cyan-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-black text-white placeholder-cyan-400 text-center text-lg transition-all duration-300"
                />
              </motion.div>

{/* Forgot Password Link */}
<motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="flex justify-center my-4 overflow-hidden"
>
  <motion.div
    whileHover={{
      scale: 1.05,
      textShadow: "0px 0px 8px rgba(0, 255, 255, 0.8)",
      color: "#67e8f9",
    }}
    transition={{ type: "spring", stiffness: 300 }}
    className="font-semibold rounded-md text-cyan-400 hover:text-cyan-500 text-center text-base tracking-wide cursor-pointer "
  >
    <Link to={"/password/forgot"}>
      Forgot Password?
    </Link>
  </motion.div>
</motion.div>

{/* Mobile Sign Up Link */}
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
  className="block md:hidden text-center font-semibold mt-10 space-y-4"
>
  {/* Animated Paragraph */}
  <motion.p
    animate={{
      opacity: [1, 0.8, 1],
      y: [0, -2, 0],
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    className="text-gray-300 text-lg tracking-wide"
  >
    New to our platform?
  </motion.p>

  {/* Animated Sign Up Button */}
  <motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: "spring", stiffness: 300 }}
  className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 text-white font-semibold text-lg shadow-md hover:shadow-lg cursor-pointer overflow-hidden"
>
    {/* Inner Shine Animation */}
    <motion.div
      animate={{
        x: ["-100%", "100%"],
      }}
      transition={{
        repeat: Infinity,
        duration: 2,
        ease: "linear",
      }}
      className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-white/10 via-white/20 to-white/10 opacity-20 blur-md"
    />

    {/* Button Text */}
    <Link
      to={"/register"}
      className="relative z-10 text-white font-semibold"
    >
      Sign Up
    </Link>
  </motion.div>
</motion.div>


              {/* Sign In  */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="flex justify-center overflow-hidden"
              >
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.1, rotate: 3 }}
                  whileTap={{ scale: 0.9 }}
                  className={`relative overflow-hidden px-6 py-3 font-bold text-white bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 rounded-full shadow-xl transition-all duration-500 ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {/* Glowing Background Animation */}
                  <motion.span
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.8, 0.4, 0.8],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 opacity-20 blur-md z-[-1]"
                  ></motion.span>

                  {/* Glowing Border */}
                  <motion.div
                    animate={{ opacity: [0.5, 0.7, 0.5] }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 border-2 border-cyan-300 rounded-full pointer-events-none"
                  ></motion.div>

                  <span className="relative z-10">
                    {loading ? "Loading..." : "SIGN IN"}
                  </span>
                </motion.button>
              </motion.div>
            </form>
          </motion.div>
        </motion.div>

        {/* Right Side */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="hidden w-full md:w-1/2 bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-500 text-white md:flex flex-col items-center justify-center p-8 rounded-tl-[80px] rounded-bl-[80px] relative"
        >
          {/* Glowing Animated Border */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={{
              boxShadow: [
                "0 0 20px #00FFFF, 0 0 40px #00FFFF", // Cyan
                "0 0 20px #0080FF, 0 0 40px #0080FF", // Blue
                "0 0 20px #8000FF, 0 0 40px #8000FF", // Purple
                "0 0 20px #FF00FF, 0 0 40px #FF00FF", // Pink
                "0 0 20px #00FFFF, 0 0 40px #00FFFF", // back to Cyan
              ],
              borderColor: [
                "#00FFFF",
                "#0080FF",
                "#8000FF",
                "#FF00FF",
                "#00FFFF",
              ],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
            }}
            className="absolute inset-0 rounded-tl-[80px] rounded-bl-[80px] border-2 pointer-events-none"
          />

          {/* Inside Content */}
          <div className="text-center h-[570px] relative z-10">
            {/* Floating Book Image */}
            <motion.div
              animate={{ y: [0, -15, 0], scale: [1, 1.03, 1] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="flex flex-col justify-center items-center mb-12 overflow-hidden"
            >
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="relative"
              >
                <img
                  src={book}
                  alt="books"
                  className="h-[200px] w-auto object-contain"
                />
              </motion.div>
            </motion.div>

            {/* Subtitle */}
            <p className="text-gray-100 text-lg mb-12 animate-pulse tracking-wide">
              New to our platform? Sign up now.
            </p>

            {/* SIGN UP Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
              className="overflow-hidden flex justify-center mt-8"
            >
              <motion.div
                animate={{ opacity: [0.8, 0.6, 0.8], scale: [1, 1.02, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="relative px-10 py-4 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 rounded-full shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer"
              >
                {/* Inner Glow */}
                <motion.span
                  animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/20 to-white/10 blur-md"
                ></motion.span>

                {/* Button Text */}
                <Link
                    to={"/register"}
                className="relative z-10 text-white font-bold text-lg">
                  SIGN UP
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    
    </>
  )
}

export default Login