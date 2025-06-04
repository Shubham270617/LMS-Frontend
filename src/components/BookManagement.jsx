import React, { useEffect, useState } from 'react';
import { Book, BookA, NotebookPen } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleAddBookPopup, toggleReadBookPopup, toggleRecordBookPopup } from '../store/slice/popupSlice';
import { toast } from 'react-toastify';
import { fetchAllBooks, resetBookSlice } from '../store/slice/bookSlice';
import { fetchAllBorrowedBooks, resetBorrowSlice } from '../store/slice/borrowSlice';
import { Header } from '../layout/Header';
import AddBookPopup from '../popups/AddBookPopup';
import ReadBookPopup from '../popups/ReadBookPopup';
import RecordBookPopup from '../popups/RecordBookPopup';
import { motion } from 'framer-motion';

const BookManagement = () => {
  const dispatch = useDispatch();

  const { loading, error, message, books } = useSelector((state) => state.book);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { addBookPopup, readBookPopup, recordBookPopup } = useSelector((state) => state.popup);

  const {
    loading: borrowSliceLoading,
    error: borrowSliceError,
    message: borrowSliceMessage,
  } = useSelector((state) => state.borrow);

  const [readBook, setReadBook] = useState({});
  const openReadPopup = (id) => {
    const book = books.find((book) => book._id === id);
    setReadBook(book);
    dispatch(toggleReadBookPopup());
  };

  const [borrowBookId, setBorrowBookId] = useState('');
  const openRecordBookPopup = (bookId) => {
    setBorrowBookId(bookId);
    dispatch(toggleRecordBookPopup());
  };

  useEffect(() => {
    if (message || borrowSliceMessage) {
      toast.success(message || borrowSliceMessage);
      dispatch(fetchAllBooks());
      dispatch(fetchAllBorrowedBooks());
      dispatch(resetBookSlice());
      dispatch(resetBorrowSlice());
    }
    if (error || borrowSliceError) {
      toast.error(error || borrowSliceError);
      dispatch(resetBookSlice());
      dispatch(resetBorrowSlice());
    }
  }, [dispatch, message, error, loading, borrowSliceError, borrowSliceLoading, borrowSliceMessage]);

  const [searchedKeyword, setSearchedKeyword] = useState('');
  const handleSearch = (e) => {
    setSearchedKeyword(e.target.value.toLowerCase());
  };


  const searchedBooks = Array.isArray(books)
    ? books.filter((book) =>
        book?.title?.toLowerCase().includes(searchedKeyword.toLowerCase())
      )
    : [];

 

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
              {user && user.role === 'Admin' ? '📚 Book Management' : '📖 Books'}
            </motion.h2>

            <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 w-full lg:w-auto overflow-hidden">
              {isAuthenticated && user?.role === 'Admin' && (
                <motion.button
                  onClick={() => dispatch(toggleAddBookPopup())}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative pl-12 sm:w-52 w-full flex gap-3 overflow-hidden justify-center items-center py-2 px-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-[0_0_15px_rgba(255,0,255,0.6)] hover:shadow-[0_0_25px_rgba(255,0,255,0.8)] transition-all duration-300"
                >
                  <span className="absolute left-4 w-[30px] h-[30px] rounded-full bg-white text-purple-600 font-bold flex items-center justify-center shadow-lg ring-2 ring-pink-400 animate-pulse before:absolute before:content-[''] before:w-full before:h-full before:rounded-full before:bg-pink-300 before:opacity-40 before:blur-md before:animate-ping overflow-hidden">
                    +
                  </span>
                  Add Book
                </motion.button>
              )}

              <motion.input
                type="text"
                placeholder="Search Book!!!"
                className="w-full sm:w-52 border border-purple-300 p-2 rounded-md bg-white text-gray-700 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-pink-300 shadow-md transition-all duration-300"
                value={searchedKeyword}
                onChange={handleSearch}
                whileFocus={{ scale: 1.02 }}
              />
            </div>
          </motion.header>
        </motion.div>

        {/* Table */}
        {books && books.length > 0 ? (
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
                    className="px-4 py-3 text-left font-bold tracking-wide text-purple-200 drop-shadow-[0_0_8px_rgba(216,191,216,0.9)]"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    Name
                  </motion.th>
                  <motion.th
                    className="px-4 py-3 text-left font-bold tracking-wide text-blue-200 drop-shadow-[0_0_8px_rgba(173,216,230,0.9)]"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    Author
                  </motion.th>
                  {isAuthenticated && user?.role === 'Admin' && (
                    <motion.th
                      className="px-4 py-3 text-left font-bold tracking-wide text-yellow-200 drop-shadow-[0_0_8px_rgba(255,255,150,0.9)]"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7 }}
                    >
                      Quantity
                    </motion.th>
                  )}
                  <motion.th
                    className="px-4 py-3 text-left font-bold tracking-wide text-green-200 drop-shadow-[0_0_8px_rgba(144,238,144,0.9)]"
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
                    Availability
                  </motion.th>
                  {isAuthenticated && user?.role === 'Admin' && (
                    <motion.th
                      className="px-4 py-3 text-center font-bold tracking-wide text-indigo-200 drop-shadow-[0_0_8px_rgba(160,160,255,0.9)]"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1.0 }}
                    >
                      Record Book
                    </motion.th>
                  )}
                </tr>
              </thead>
              <tbody>
                {searchedBooks.map((book, index) => (
                  <motion.tr
                    key={book._id}
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
                        {book.title}
                      </motion.div>
                    </td>
                    <td className="px-4 py-3">
                      <motion.div
                        className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 font-semibold text-sm drop-shadow-[0_0_10px_rgba(199,99,255,0.7)] cursor-pointer animate-glow select-none"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        {book.author}
                      </motion.div>
                    </td>
                    {isAuthenticated && user?.role === 'Admin' && (
                      <td className="px-4 py-3">
                        <motion.div
                          className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 font-semibold text-sm drop-shadow-[0_0_10px_rgba(199,99,255,0.7)] cursor-pointer animate-glow select-none"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                        >
                          {book.quantity}
                        </motion.div>
                      </td>
                    )}
                    <td className="px-4 py-3">
                      <motion.div
                        className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 font-semibold text-sm drop-shadow-[0_0_10px_rgba(199,99,255,0.7)] cursor-pointer animate-glow select-none"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(book.price)}
                      </motion.div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold shadow-inner ${
                          book.availability
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-600'
                        }`}
                      >
                        {book.availability ? 'Available' : 'Unavailable'}
                      </span>
                    </td>
                    {isAuthenticated && user?.role === 'Admin' && (
                      <td className="px-4 py-3 flex justify-center items-center space-x-4">
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 5 }}
                          className="p-2 rounded-full bg-purple-200 hover:bg-purple-300 text-purple-800 shadow-md hover:shadow-purple-400 transition cursor-pointer"
                          onClick={() => openReadPopup(book._id)}
                        >
                          <BookA size={20} />
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: -5 }}
                          className="p-2 rounded-full bg-blue-200 hover:bg-blue-300 text-blue-800 shadow-md hover:shadow-blue-400 transition cursor-pointer"
                          onClick={() => openRecordBookPopup(book._id)}
                        >
                          <NotebookPen size={20} />
                        </motion.div>
                      </td>
                    )}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        ) : (
          <motion.h3
            className="text-3xl mt-10 font-semibold text-center text-purple-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            No books found in the library!!
          </motion.h3>
        )}
      </main>

      {addBookPopup && <AddBookPopup />}
      {readBookPopup && <ReadBookPopup book={readBook} />}
      {recordBookPopup && <RecordBookPopup bookId={borrowBookId} />}
    </>
  );
};

export default BookManagement;
