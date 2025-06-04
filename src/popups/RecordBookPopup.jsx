import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { recordBorrowedBook } from '../store/slice/borrowSlice';
import { toggleRecordBookPopup } from '../store/slice/popUpSlice';
import { motion } from 'framer-motion';
const RecordBookPopup = ({ bookId }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState();
  const handleRecordBook = (e) => {
    e.preventDefault();
    dispatch(recordBorrowedBook(email, bookId));
  };
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-md z-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        className="w-full md:w-1/3 bg-white/10 backdrop-blur-2xl rounded-2xl border border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.4)] p-6"
      >
        <motion.h3
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-2xl font-extrabold text-cyan-300 text-center mb-6 tracking-wide"
        >
          <motion.span
            animate={{
              textShadow: [
                '0 0 6px rgba(34,211,238,0.8)',
                '0 0 10px rgba(34,211,238,1)',
                '0 0 14px rgba(34,211,238,1)',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: 'mirror',
              ease: 'easeInOut',
            }}
            className="inline-block"
          >
            📘 Record Book
          </motion.span>
        </motion.h3>

        <form onSubmit={handleRecordBook} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <label className="block text-cyan-200 font-semibold mb-2">📧 User Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Borrower's Email"
              className="w-full px-4 py-2 rounded-lg border border-cyan-300 bg-white/70 text-gray-800 placeholder-cyan-400 shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-400 transition duration-300"
              required
            />
          </motion.div>

          <motion.div
            className="flex justify-end gap-4 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <motion.button
              type="button"
              onClick={() => dispatch(toggleRecordBookPopup())}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 rounded-md font-semibold bg-gray-200 hover:bg-gray-300 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              ❌ Close
            </motion.button>

            <motion.button
              type="submit"
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 20px rgba(34,211,238,0.9)',
              }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2 rounded-md font-semibold text-white bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 hover:brightness-110 transition-all duration-300 shadow-xl"
            >
              ✅ Record
            </motion.button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
};

export default RecordBookPopup;
