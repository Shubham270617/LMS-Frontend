import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import logo_lib from '../assets/logo_lib.png';
import Header from '../layout/Header';
import { FaUsersViewfinder } from 'react-icons/fa6';
import { FaBook } from 'react-icons/fa';
import { RiAdminFill } from 'react-icons/ri';
import { FaUser } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
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

const AdminDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.user);
  const { books } = useSelector((state) => state.book);
  const { allBorrowedBooks } = useSelector((state) => state.borrow);
  const { settingPopup } = useSelector((state) => state.popup);


  const glowColors = {
  users: "from-blue-400 to-indigo-600",
  books: "from-green-400 to-teal-500",
  admin: "from-pink-400 to-rose-500",
};

const StatCard = ({ icon, count, label, glow }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    whileHover={{
      scale: 1.05,
      boxShadow: `0 0 20px 6px var(--tw-gradient-stops)`,
    }}
    className={`flex items-center gap-4 p-5 max-h-[130px] rounded-lg w-full max-w-[360px]
      cursor-default
      bg-gradient-to-br ${glow} text-white
      shadow-lg
      transition-all duration-300 overflow-hidden ml-5`}
  >
    <span
      className="h-20 min-w-20 flex justify-center items-center rounded-lg bg-white bg-opacity-20 overflow-hidden"
      style={{ filter: "drop-shadow(0 0 10px rgba(255,255,255,0.6))" }}
    >
      {icon}
    </span>
    <span className="w-[2px] bg-white/50 h-20 lg:h-full overflow-hidden"></span>
    <div className="flex flex-col items-center gap-1">
      <h4 className="font-extrabold text-3xl overflow-hidden">{count}</h4>
      <p className="font-semibold text-white text-sm">{label}</p>
    </div>
  </motion.div>
);

const UserCard = ({ user }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6 }}
    whileHover={{
      boxShadow: "0 0 40px 12px rgba(255, 165, 0, 0.7)", // subtle glow on card hover
      scale: 1.05,
    }}
    className="bg-gray-900 sm:p-6 rounded-2xl shadow-2xl flex flex-col justify-center items-center gap-4 w-[90%] sm:w-[350px] md:w-[400px] xl:w-[450px] mx-auto overflow-hidden mt-3 h-[350px]"
  >
    {user?.avatar?.url ? (
      <motion.div
        className="rounded-full p-[4px] "
        style={{
          background: "conic-gradient(from 0deg, #ff6ec4, #7873f5, #4ade80, #facc15, #fb7185, #ff6ec4)",
          boxShadow: "0 0 15px 4px rgba(251, 113, 133, 0.7)",
        }}
         animate={{
    
    y: [0, 10, 0],  // up 10px, back to 0
  }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      >
        <img
          src={user.avatar.url}
          alt="User Avatar"
          className="w-24 h-24 sm:w-16 sm:h-16 rounded-full object-cover"
        />
      </motion.div>
    ) : (
      <FaUser className="w-16 h-16 text-gradient bg-gradient-to-r from-pink-500 via-purple-500 to-green-400 bg-clip-text text-transparent" />
    )}
    <h2
      className="text-2xl font-semibold text-center bg-gradient-to-r from-pink-500 via-purple-500 to-green-400 bg-clip-text text-transparent"
      style={{ WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
    >
      {user?.name || "User"}
    </h2>
    <p
      className="text-center text-sm sm:text-base max-w-xs"
      style={{
        background: "linear-gradient(90deg, #f43f5e, #ec4899, #8b5cf6, #22d3ee)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      Welcome to the Admin Dashboard, {user?.name || "User"}! Here you can manage users, books,
      and monitor library activities.
    </p>
  </motion.div>
);



  const [totalUsers, setTotalUsers] = useState(0);
  const [totalAdmin, setTotalAdmin] = useState(0);
  const [totalBooks, setTotalBooks] = useState((books && books.length) || 0);
  const [totalBorrowedBooks, setTotalBorrowedBooks] = useState(0);
  const [totalReturnedBooks, setTotalReturnedBooks] = useState(0);

  useEffect(() => {
    let numberOfUsers = users.filter((user) => user.role === 'User');
    let numberOfAdmins = users.filter((user) => user.role === 'Admin');
    setTotalUsers(numberOfUsers.length);
    setTotalAdmin(numberOfAdmins.length);

    let noOfTotalBorrowedBooks = allBorrowedBooks.filter((book) => book.returnDate === null);
    let noOfTotalReturnedBooks = allBorrowedBooks.filter((book) => book.returnDate !== null);
    setTotalBorrowedBooks(noOfTotalBorrowedBooks.length);
    setTotalReturnedBooks(noOfTotalReturnedBooks.length);
  }, [users, allBorrowedBooks]);

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
        <div className="flex flex-col-reverse xl:flex-row">
          {/* Left Side */}
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



          {/* Right Side */}
           <div className="flex flex-[4] flex-col gap-7 lg:gap-7 lg:py-7 justify-between xl:min-h-[85.5vh] mr-5 overflow-hidden">
      <div className="flex flex-col-reverse lg:flex-row gap-7 flex-[4] overflow-hidden">
        <div className="flex flex-col gap-7 flex-1 items-center lg:items-start overflow-hidden">
          <StatCard
            icon={<FaUsersViewfinder className="w-10 h-8 overflow-hidden" />}
            count={totalUsers}
            label="Total User Base"
            glow={glowColors.users}
          />
          <StatCard
            icon={<FaBook className="w-10 h-8" />}
            count={totalBooks}
            label="Total Book Count"
            glow={glowColors.books}
          />
          <StatCard
            icon={<RiAdminFill className="w-10 h-8" />}
            count={totalAdmin}
            label="Total Admin Count"
            glow={glowColors.admin}
          />
        </div>

        <div className="flex flex-col lg:flex-row flex-1 justify-center items-center overflow-hidden">
          <UserCard user={user} />
        </div>
      </div>
      <QuoteSection />
    </div>
        </div>
      </main>
    </>
  );
};

const QuoteSection = () => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className="hidden xl:flex p-7 rounded-2xl shadow-[inset_0_0_25px_#9333ea66] relative flex-[3] justify-center items-center min-h-52 bg-gradient-to-br from-[#1e1e2f] via-[#2c2c3f] to-[#1e1e2f] "
  >
    <motion.h4
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="text-center font-extrabold text-transparent bg-clip-text text-xl sm:text-4xl xl:text-xl 2xl:text-2xl 
        bg-gradient-to-r from-pink-500 via-purple-500 to-teal-400 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] overflow-hidden"
    >
      "In a world full of noise, books offer clarity — step into the library and discover stories that enlighten minds, ignite curiosity, and inspire a lifelong love for learning."
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
);
;

export default AdminDashboard;
