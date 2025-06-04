import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PiKeyReturnBold } from 'react-icons/pi';
import { FaSquareCheck } from 'react-icons/fa6';
import { toggleReturnBookPopup } from '../store/slice/popupSlice';
import { fetchAllBooks, resetBookSlice } from '../store/slice/bookSlice';
import { fetchAllBorrowedBooks, resetBorrowSlice } from '../store/slice/borrowSlice';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import ReturnBookPopup from '../popups/ReturnBookPopup';
import Header from '../layout/Header';

const Catalog = () => {
  const dispatch = useDispatch();

  const { returnBookPopup } = useSelector((state) => state.popup);
  const { loading, error, message, allBorrowedBooks } = useSelector((state) => state.borrow);

  const [filter, setFilter] = useState('borrowed');

  const formateDateAndTime = (timeStamp) => {
    const date = new Date(timeStamp);
    const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getFullYear())}`;
    const formattedTime = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
    const result = `${formattedDate} ${formattedTime}`;
    return result;
  };

  const pulseGlow = {
    boxShadow: [
      '0 0 8px 2px rgba(168,85,247,0.5)',
      '0 0 20px 6px rgba(168,85,247,0.8)',
      '0 0 8px 2px rgba(168,85,247,0.5)',
    ],
    textShadow: [
      '0 0 4px rgba(240,171,252,0.7)',
      '0 0 10px rgba(240,171,252,1)',
      '0 0 4px rgba(240,171,252,0.7)',
    ],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: 'loop',
      ease: 'easeInOut',
    },
  };

  const pulseGlowCyan = {
    boxShadow: [
      '0 0 8px 2px rgba(34,211,238,0.5)',
      '0 0 20px 6px rgba(34,211,238,0.8)',
      '0 0 8px 2px rgba(34,211,238,0.5)',
    ],
    textShadow: [
      '0 0 4px rgba(153,246,228,0.7)',
      '0 0 10px rgba(153,246,228,1)',
      '0 0 4px rgba(153,246,228,0.7)',
    ],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: 'loop',
      ease: 'easeInOut',
    },
  };

  const formateDate = (timeStamp) => {
    const date = new Date(timeStamp);
    return `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getFullYear())}`;
  };

  const currentDate = new Date();

  const borrowedBooks = allBorrowedBooks?.filter((book) => {
    const dueDate = new Date(book.dueDate);
    return dueDate > currentDate;
  });
  const overdueBooks = allBorrowedBooks?.filter((book) => {
    const dueDate = new Date(book.dueDate);
    return dueDate < currentDate;
  });

  const booksToDisplay = filter === 'borrowed' ? borrowedBooks : overdueBooks;

  const [email, setEmail] = useState('');
  const [borrowedBookId, setBorrowedBookId] = useState('');
  const openReturnBookPopup = (bookId, email) => {
    setBorrowedBookId(bookId);
    setEmail(email);
    dispatch(toggleReturnBookPopup());
  };

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(fetchAllBooks());
      dispatch(fetchAllBorrowedBooks());
      dispatch(resetBookSlice());
      dispatch(resetBorrowSlice());
    }
    if (error) {
      toast.error(error);
      dispatch(resetBorrowSlice());
    }
  }, [dispatch, error, loading]);

  return (
    <>
      <main className="absolute top-0 w-full left-0">
        <Header />

        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row gap-5 px-5 mt-8 overflow-hidden"
        >
          {/* Returned Button */}
          <motion.button
            onClick={() => setFilter('borrowed')}
            animate={filter === 'borrowed' ? pulseGlow : {}}
            whileHover={{
              scale: 1.07,
              backgroundColor: '#a855f7',
              color: '#fce7f3',
              boxShadow: '0 0 30px 10px rgba(168,85,247,1)',
              textShadow: '0 0 15px rgba(240,171,252,1)',
              transition: { duration: 0.4 },
            }}
            className={`relative rounded-xl py-3 w-full sm:w-72 font-semibold border-2 transition-colors duration-500 ease-in-out ${
              filter === 'borrowed'
                ? 'bg-purple-700 text-pink-100 border-purple-600'
                : 'bg-purple-200 text-purple-800 border-purple-300 hover:bg-purple-300 hover:text-purple-900'
            }`}
          >
            📚 Borrowed Books
          </motion.button>

          {/* Non-Returned Button */}
          <motion.button
            onClick={() => setFilter('overdue')}
            animate={filter === 'overdue' ? pulseGlowCyan : {}}
            whileHover={{
              scale: 1.07,
              backgroundColor: '#22d3ee',
              color: '#ecfeff',
              boxShadow: '0 0 30px 10px rgba(34,211,238,1)',
              textShadow: '0 0 15px rgba(153,246,228,1)',
              transition: { duration: 0.4 },
            }}
            className={`relative rounded-xl py-3 w-full sm:w-72 font-semibold border-2 transition-colors duration-500 ease-in-out ${
              filter === 'overdue'
                ? 'bg-cyan-600 text-cyan-50 border-cyan-500'
                : 'bg-cyan-200 text-cyan-900 border-cyan-300 hover:bg-cyan-300 hover:text-cyan-800'
            }`}
          >
            Overdue Borrowers
          </motion.button>
        </motion.header>

        {booksToDisplay && booksToDisplay.length > 0 ? (
          <motion.div
            className="mt-8 mx-4 overflow-auto rounded-xl bg-gradient-to-br from-white via-purple-50 to-blue-100 shadow-[0_0_20px_rgba(200,150,255,0.3)] p-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <table className="min-w-full border-collapse rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-gradient-to-r from-pink-400 via-purple-500 to-blue-400 shadow-md">
                  <motion.th
                    className="px-4 py-3 text-left font-bold tracking-wide text-pink-200 drop-shadow-[0_0_8px_rgba(255,192,203,0.9)]"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    ID
                  </motion.th>
                  <motion.th
                    className="px-4 py-3 text-left font-bold tracking-wide text-blue-200 drop-shadow-[0_0_8px_rgba(173,216,230,0.9)]"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    Username
                  </motion.th>
                  <motion.th
                    className="px-4 py-3 text-left font-bold tracking-wide text-yellow-200 drop-shadow-[0_0_8px_rgba(255,255,150,0.9)]"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                  >
                    Email
                  </motion.th>
                  <motion.th
                    className="px-4 py-3 text-left font-bold tracking-wide text-green-200 drop-shadow-[0_0_8px_rgba(144,238,144,0.9)] overflow-hidden"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    Price
                  </motion.th>
                  <motion.th
                    className="px-4 py-3 text-left font-bold tracking-wide text-red-200 drop-shadow-[0_0_8px_rgba(255,160,160,0.9)]"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9 }}
                  >
                    Due Date
                  </motion.th>
                  <motion.th
                    className="px-4 py-3 text-center font-bold tracking-wide text-indigo-900 drop-shadow-[0_0_8px_rgba(160,160,255,0.9)]"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.0 }}
                  >
                    Date & Time
                  </motion.th>
                  <motion.th
                    className="px-4 py-3 text-center font-bold tracking-wide text-violet-900 drop-shadow-[0_0_8px_rgba(160,160,255,0.9)]"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.0 }}
                  >
                    Return
                  </motion.th>
                </tr>
              </thead>

              <tbody>
                {booksToDisplay.map((book, index) => (
                  <motion.tr
                    key={index}
                    className={`transition-all duration-300 ${
                      (index + 1) % 2 === 0 ? 'bg-white/70' : 'bg-white/90'
                    } hover:bg-purple-100/60`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <td className="px-4 py-3">
                      <motion.div
                        className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 font-semibold text-sm drop-shadow-[0_0_10px_rgba(199,99,255,0.7)] cursor-pointer animate-glow select-none"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        {index + 1}
                      </motion.div>
                    </td>
                    <td className="px-4 py-3">
                      <motion.div
                        className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 font-semibold text-sm drop-shadow-[0_0_10px_rgba(199,99,255,0.7)] cursor-pointer animate-glow select-none"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        {book?.user.name}
                      </motion.div>
                    </td>
                    <td className="px-4 py-3">
                      <motion.div
                        className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 font-semibold text-sm drop-shadow-[0_0_10px_rgba(199,99,255,0.7)] cursor-pointer animate-glow select-none"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        {book?.user.email}
                      </motion.div>
                    </td>
                    <td className="px-4 py-3">
                      <motion.div
                        className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 font-semibold text-sm drop-shadow-[0_0_10px_rgba(199,99,255,0.7)] cursor-pointer animate-glow select-none"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div
                          className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 font-semibold text-sm drop-shadow-[0_0_10px_rgba(199,99,255,0.7)] cursor-pointer animate-glow select-none overflow-hidden"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                        >
                          {book.price}
                        </motion.div>
                      </motion.div>
                    </td>

                    <td className="px-4 py-3">
                      <motion.div
                        className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 font-semibold text-sm drop-shadow-[0_0_10px_rgba(199,99,255,0.7)] cursor-pointer animate-glow select-none"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        {formateDate(book.dueDate)}
                      </motion.div>
                    </td>
                    <td className="px-4 py-3">
                      <motion.div
                        className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 font-semibold text-sm drop-shadow-[0_0_10px_rgba(199,99,255,0.7)] cursor-pointer animate-glow select-none"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        {formateDateAndTime(book.createdAt)}
                      </motion.div>
                    </td>
                    <td className="px-4 py-3 text-center">
  {book.returnDate ? (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className="flex justify-center items-center"
    >
      <FaSquareCheck className="w-6 h-6 text-green-500" />
    </motion.div>
  ) : (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        scale: 1.2,
        filter: 'drop-shadow(0 0 6px rgba(59, 130, 246, 0.8))',
      }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      onClick={() => openReturnBookPopup(book.book, book?.user.email)}
      className="cursor-pointer flex justify-center items-center"
    >
      <PiKeyReturnBold className="w-6 h-6 text-blue-500 transition-all" />
    </motion.div>
  )}
</td>

                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        ) : (
          <motion.h3
            className="text-3xl mt-10 font-semibold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 drop-shadow-[0_0_10px_rgba(168,85,247,0.8)] overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            No {filter === 'borrowed' ? 'borrowed' : 'overdue'} books found
          </motion.h3>
        )}
      </main>
      {returnBookPopup && <ReturnBookPopup bookId={borrowedBookId} email={email} />}
    </>
  );
};

export default Catalog;
