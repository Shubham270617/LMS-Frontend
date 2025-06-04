import React, { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { otpVerification, resetAuthSlice } from "../store/slice/authSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import logo_lib from "../assets/logo_lib.png";
import book from "../assets/book.png";
import { motion } from "framer-motion";

const OTP = () => {
  const { email } = useParams();
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();

  const { loading, error, message, user, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const handleOtpVerification = (e) => {
    e.preventDefault();
    dispatch(otpVerification( email, otp ));
  };

  useEffect(() => {
    // if (message) {
    //   toast.success(message);
    // }
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
  }, [dispatch, error, isAuthenticated, loading, message]);

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <div className="flex flex-col justify-center md:flex-row h-screen bg-gradient-to-tr from-black via-gray-900 to-black ">
        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="w-full md:w-1/2 flex items-center justify-center p-8 relative "
        >
          {/* Back Button */}
          <motion.div
            initial={{ x: -80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, type: "spring", stiffness: 100 }}
            className="fixed top-6 left-4 z-50 overflow-hidden"
          >
            <motion.div
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="relative group overflow-hidden"
            >
              <Link
                to={"/register"}
                className="relative px-6 py-3 rounded-full text-white font-bold bg-gradient-to-r from-cyan-500 to-blue-500 shadow-xl transition-all duration-500 overflow-hidden"
              >
                ← Back
                {/* Animated Glow Ring */}
                <motion.span
                  animate={{
                    opacity: [0.7, 0.3, 0.7],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 blur-xl z-[-1]"
                />
              </Link>
            </motion.div>
          </motion.div>

          {/* Main Card */}
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            whileHover={{ scale: 1.02 }}
            className="relative max-w-sm w-full bg-black bg-opacity-60 rounded-2xl p-8 backdrop-blur-md shadow-[0_0_30px_cyan] transition-all duration-500 overflow-hidden"
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
              Check Your Mailbox
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2 }}
              className="text-gray-300 text-center mb-12 text-lg"
            >
              Please enter the OTP to proceed
            </motion.p>

            {/* OTP Form */}
            <form onSubmit={handleOtpVerification}>
              {/* OTP Input */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-6 overflow-hidden"
              >
                <motion.input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  whileFocus={{ scale: 1.05, boxShadow: "0 0 20px #00FFFF" }}
                  whileHover={{ scale: 1.03 }}
                  className="w-full px-6 py-4 border-2 border-cyan-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-black text-white placeholder-cyan-400 text-center text-lg transition-all duration-300"
                />
              </motion.div>

              {/* Verify Button */}
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
                  className={`relative overflow-hidden px-10 py-4 font-bold text-white bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 rounded-full shadow-xl transition-all duration-500 ${
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
                    {loading ? "Loading..." : "VERIFY"}
                  </span>
                </motion.button>
              </motion.div>
            </form>
          </motion.div>
        </motion.div>

        {/* Right Side  */}
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
  );
};

export default OTP;
