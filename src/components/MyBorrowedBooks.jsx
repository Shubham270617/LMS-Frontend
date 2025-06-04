import React, { useState } from 'react';
import { BookA, BookOpen } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleReadBookPopup } from '../store/slice/popUpSlice';
import { Header } from '../layout/Header';
import { motion } from 'framer-motion';
import ReadBookPopup from '../popups/ReadBookPopup';

const MyBorrowedBooks = () => {
  const dispatch = useDispatch();

  const { books } = useSelector((state) => state.book);
  const { userBorrowedBooks } = useSelector((state) => state.borrow);

  const { readBookPopup } = useSelector((state) => state.popup);

  const [readBook, setReadBook] = useState({});
  const openReadPopup = (id) => {
    const book = books.find((book) => book._id === id);

    setReadBook(book);
    dispatch(toggleReadBookPopup());
  };

  const formateDate = (timeStamp) => {
    const date = new Date(timeStamp);
    const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getFullYear())}`;
    const formattedTime = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
    const result = `${formattedDate} ${formattedTime}`;
    return result;
  };

  const [filter, setFilter] = useState('returned');

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
  const returnedBooks = userBorrowedBooks?.filter((book) => {
    return book.returened === true;
  });

  const nonReturnedBooks = userBorrowedBooks?.filter((book) => {
    return book.returened === false;
  });

  const booksToDispaly = filter === 'returned' ? returnedBooks : nonReturnedBooks;

  return (
    <>
      <main className="absolute top-0 w-full left-0">
        <Header />
        <motion.div
          className="mt-5 flex flex-col overflow-hidden px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <motion.header
            className="flex flex-col gap-5 md:flex-row md:justify-between md:items-center relative px-6 py-6 bg-gradient-to-br from-purple-100 via-white to-blue-100 rounded-2xl shadow-xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <motion.h2
              className="text-3xl overflow-hidden font-extrabold bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent animate-pulse drop-shadow-[0_0_10px_rgba(200,100,255,0.8)]"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Borrowed Books
            </motion.h2>
          </motion.header>
        </motion.div>

        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row gap-5 px-5 mt-8 overflow-hidden"
        >
          {/* Returned Button */}
          <motion.button
            onClick={() => setFilter('returned')}
            animate={filter === 'returned' ? pulseGlow : {}}
            whileHover={{
              scale: 1.07,
              backgroundColor: '#a855f7',
              color: '#fce7f3',
              boxShadow: '0 0 30px 10px rgba(168,85,247,1)',
              textShadow: '0 0 15px rgba(240,171,252,1)',
              transition: { duration: 0.4 },
            }}
            className={`relative rounded-xl py-3 w-full sm:w-72 font-semibold border-2 transition-colors duration-500 ease-in-out ${
              filter === 'returned'
                ? 'bg-purple-700 text-pink-100 border-purple-600'
                : 'bg-purple-200 text-purple-800 border-purple-300 hover:bg-purple-300 hover:text-purple-900'
            }`}
          >
            📚 Returned Books
          </motion.button>

          {/* Non-Returned Button */}
          <motion.button
            onClick={() => setFilter('nonReturned')}
            animate={filter === 'nonReturned' ? pulseGlowCyan : {}}
            whileHover={{
              scale: 1.07,
              backgroundColor: '#22d3ee',
              color: '#ecfeff',
              boxShadow: '0 0 30px 10px rgba(34,211,238,1)',
              textShadow: '0 0 15px rgba(153,246,228,1)',
              transition: { duration: 0.4 },
            }}
            className={`relative rounded-xl py-3 w-full sm:w-72 font-semibold border-2 transition-colors duration-500 ease-in-out ${
              filter === 'nonReturned'
                ? 'bg-cyan-600 text-cyan-50 border-cyan-500'
                : 'bg-cyan-200 text-cyan-900 border-cyan-300 hover:bg-cyan-300 hover:text-cyan-800'
            }`}
          >
            📕 Non-Returned Books
          </motion.button>
        </motion.header>

        {booksToDispaly && booksToDispaly.length > 0 ? (
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
                    Book Title
                  </motion.th>
                  <motion.th
                    className="px-4 py-3 text-left font-bold tracking-wide text-yellow-200 drop-shadow-[0_0_8px_rgba(255,255,150,0.9)]"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                  >
                    Date & Time
                  </motion.th>
                  <motion.th
                    className="px-4 py-3 text-left font-bold tracking-wide text-green-200 drop-shadow-[0_0_8px_rgba(144,238,144,0.9)]"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    Due Date
                  </motion.th>
                  <motion.th
                    className="px-4 py-3 text-left font-bold tracking-wide text-red-200 drop-shadow-[0_0_8px_rgba(255,160,160,0.9)]"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9 }}
                  >
                    Returned
                  </motion.th>
                  <motion.th
                    className="px-4 py-3 text-center font-bold tracking-wide text-indigo-200 drop-shadow-[0_0_8px_rgba(160,160,255,0.9)]"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.0 }}
                  >
                    View
                  </motion.th>
                </tr>
              </thead>

              <tbody>
                {booksToDispaly.map((book, index) => (
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
                        {book.bookTitle}
                      </motion.div>
                    </td>
                    <td className="px-4 py-3">
                      <motion.div
                        className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 font-semibold text-sm drop-shadow-[0_0_10px_rgba(199,99,255,0.7)] cursor-pointer animate-glow select-none"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        {formateDate(book.borrowedDate)}
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
                        {book.returened ? 'Yes' : 'No'}
                      </motion.div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        className="w-10 h-10 mx-auto flex items-center justify-center rounded-full bg-purple-200 hover:bg-purple-300 text-purple-800 shadow-md hover:shadow-purple-400 transition cursor-pointer"
                        onClick={() => openReadPopup(book.bookId)}
                      >
                        <BookA className="w-5 h-5" />
                      </motion.div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        ) : filter === 'returned' ? (
          <motion.h3
            className="text-3xl mt-10 font-semibold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 drop-shadow-[0_0_10px_rgba(168,85,247,0.8)] overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            No returned 📚 books found !!
          </motion.h3>
        ) : (
          <motion.h3
            className="text-3xl mt-10 font-semibold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 drop-shadow-[0_0_10px_rgba(168,85,247,0.8)] overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            No non-returned 📕 books found !!
          </motion.h3>
        )}
      </main>
      {readBookPopup && <ReadBookPopup book={readBook} />}
    </>
  );
};

export default MyBorrowedBooks;
