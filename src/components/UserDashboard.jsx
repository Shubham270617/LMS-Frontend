import React, { useEffect, useState } from 'react';
import { CgBrowse } from 'react-icons/cg';
import { GiReturnArrow } from 'react-icons/gi';
import { useSelector, useDispatch } from 'react-redux';
import logo_lib from '../assets/logo_lib.png';
import book from '../assets/book.png';
import { Pie } from 'react-chartjs-2';
import Header from '../layout/Header';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement,
} from 'chart.js';

import { motion } from 'framer-motion';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement
);

const UserDashboard = () => {
  const { settingPopup } = useSelector((state) => state.popup);
  const { userBorrowedBooks } = useSelector((state) => state.borrow);

  const [totalBorrowedBooks, setTotalBorrowedBooks] = useState(0);
  const [totalReturnedBooks, setTotalReturnedBooks] = useState(0);
  console.log('userBorrowedBooks:', userBorrowedBooks);
  useEffect(() => {
    let noOfTotalBorrowedBooks = userBorrowedBooks.filter((book) => book.returened === false);
    let noOfTotalReturnedBooks = userBorrowedBooks.filter((book) => book.returened === true);
    setTotalBorrowedBooks(noOfTotalBorrowedBooks.length);
    setTotalReturnedBooks(noOfTotalReturnedBooks.length);
  }, [userBorrowedBooks]);

  const MotionCard = ({ icon, label }) => (
    <motion.div
      whileHover={{
        scale: 1.03,
        boxShadow: '0 0 30px rgba(139, 92, 246, 0.6)',
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex items-center gap-4 p-5 rounded-2xl shadow-lg transition duration-300 min-h-[120px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
    >
      <div className="w-[2px] h-20 bg-indigo-400 rounded-full"></div>
      <div className="bg-indigo-300/20 backdrop-blur-sm min-w-12 h-12 flex justify-center items-center rounded-lg shadow-inner">
        {icon}
      </div>
      <motion.p
        className="text-base sm:text-lg xl:text-xl font-semibold bg-gradient-to-r from-fuchsia-400 via-indigo-300 to-sky-400 bg-clip-text text-transparent"
        animate={{ y: [0, -3, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
      >
        {label}
      </motion.p>
    </motion.div>
  );

  const data = {
    labels: ['Total Borrowed Books', 'Total Returned Books'],
    datasets: [
      {
        data: [totalBorrowedBooks, totalReturnedBooks],
        backgroundColor: ['#FF6384', '#36A2EB'],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <>
      <main className="absolute top-0 w-full left-0">
        <Header />
        <div className="flex flex-col-reverse xl:flex-row ml-5 mr-5">
          {/* Left Side */}
          <div className="flex flex-[4] flex-col gap-7 px-4 py-6 lg:py-7 justify-between w-full mx-auto max-w-6xl overflow-hidden">
            {/* Top Section */}
            <div className="flex flex-col gap-7">
              {/* Book Lists */}
              <div className="flex flex-col gap-7">
                <MotionCard
                  icon={<img src={book} alt="book" className="w-10 h-10" />}
                  label="Your Borrowed Book List"
                />
                <MotionCard
                  icon={<GiReturnArrow className="w-10 h-10 text-indigo-600 overflow-hidden" />}
                  label="Your Returned Book List"
                />
              </div>

              {/* Browse Section */}
              <div className="flex flex-col lg:flex-row gap-7 h-fit overflow-hidden">
                <MotionCard
                  icon={<CgBrowse className="w-10 h-10 text-indigo-600" />}
                  label="Let's browse books inventory"
                />
                <style>
                  {`
  @keyframes glowing-border {
    0% { box-shadow: 0 0 12px #f472b6, 0 0 24px #f472b6; border-color: #f472b6; }
    25% { box-shadow: 0 0 12px #8b5cf6, 0 0 24px #8b5cf6; border-color: #8b5cf6; }
    50% { box-shadow: 0 0 12px #22d3ee, 0 0 24px #22d3ee; border-color: #22d3ee; }
    75% { box-shadow: 0 0 12px #facc15, 0 0 24px #facc15; border-color: #facc15; }
    100% { box-shadow: 0 0 12px #fb7185, 0 0 24px #fb7185; border-color: #fb7185; }
  }
`}
                </style>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="hidden lg:block w-[140px] h-[140px] rounded-full p-[6px] bg-[conic-gradient(at_top_left,_#f472b6,_#8b5cf6,_#22d3ee,_#facc15,_#fb7185)] shadow-2xl"
                >
                  <motion.img
                    src={logo_lib}
                    alt="logo"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-full h-full object-contain rounded-full border-[4px]"
                    style={{
                      animation: 'glowing-border 6s ease-in-out infinite',
                    }}
                  />
                </motion.div>
              </div>
            </div>

            {/* Quote Box */}
            <style>
              {`
  @keyframes textColorShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`}
            </style>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              whileHover={{
                scale: 1.01,
                boxShadow: '0 0 35px rgba(139, 92, 246, 0.6)',
              }}
              className="relative flex flex-col items-center justify-center bg-gradient-to-br from-indigo-200 via-purple-100 to-pink-200 p-7 text-center rounded-2xl shadow-2xl min-h-[300px] transition-all duration-500 ease-in-out"
            >
              <motion.h4
                className="text-lg sm:text-xl xl:text-3xl 2xl:text-2xl font-semibold bg-gradient-to-r from-fuchsia-500 via-indigo-500 to-teal-400 bg-clip-text text-transparent overflow-hidden"
                style={{
                  backgroundSize: '300% 300%',
                  animation: 'textColorShift 8s ease infinite',
                }}
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 6,
                  ease: 'easeInOut',
                }}
              >
                "Embarking on the journey of reading fosters endless curiosity, creativity, and
                growth."
              </motion.h4>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-sm sm:text-lg absolute right-[35px] sm:right-[78px] bottom-[10px] font-medium
          bg-gradient-to-r from-rose-400 via-violet-500 to-emerald-400 text-transparent bg-clip-text"
              >
                ~ Library Management Team
              </motion.p>
            </motion.div>
          </div>

          {/* Right Side */}
          <div className="flex-[2] flex-col gap-7 lg:flex-row flex lg:items-center xl:flex-col justify-between xl:gap-20 py-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              whileHover={{
                filter: 'drop-shadow(0 0 25px rgba(168, 85, 247, 0.6))', // Soft glowing violet
                scale: 1.02,
              }}
              className="xl:flex-[4] flex items-end w-full content-center"
            >
              <Pie data={data} options={{ cutout: 0 }} className="mx-auto lg:mx-0 w-full h-auto" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full max-w-[500px] mx-auto px-5 sm:px-9 py-6 sm:py-8 flex flex-col sm:flex-row items-center gap-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-[0_0_25px_#7c3aed]"
            >
              {/* Floating Glowing Logo */}
              <motion.img
                src={logo_lib}
                alt="logo"
                className="w-36 h-[130px] sm:h-[150px] object-contain rounded-xl shadow-[0_0_20px_#a855f7]"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* Separator Line */}
              <span className="w-full sm:w-[2px] sm:h-full bg-purple-500 rounded-full hidden sm:block"></span>

              {/* Labels */}
              <div className="flex flex-col gap-3 text-white text-center sm:text-left">
                <p className="flex items-center gap-3 justify-center sm:justify-start">
                  <span className="w-3 h-3 rounded-full bg-pink-500 shadow-[0_0_10px_#f472b6] animate-pulse"></span>
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-xl font-semibold tracking-wide animate-colorChange bg-gradient-to-r from-pink-400 via-cyan-400 to-lime-400 bg-clip-text text-transparent"
                  >
                    Total Borrowed Books
                  </motion.span>
                </p>
                <p className="flex items-center gap-3 justify-center sm:justify-start">
                  <span className="w-3 h-3 rounded-full bg-blue-400 shadow-[0_0_10px_#60a5fa] animate-pulse"></span>
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-xl font-semibold tracking-wide animate-colorChange bg-gradient-to-r from-pink-400 via-cyan-400 to-lime-400 bg-clip-text text-transparent overflow-hidden"
                  >
                    Total Returned Books
                  </motion.span>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </>
  );
};

export default UserDashboard;
