import React from 'react';
import { useDispatch } from 'react-redux';
import { returnBook } from '../store/slice/borrowSlice';
import { toggleReturnBookPopup } from '../store/slice/popUpSlice';
import { motion } from 'framer-motion';

const ReturnBookPopup = ({ bookId, email }) => {
  const dispatch = useDispatch();
  const handleReturnBook = (e) => {
    e.preventDefault();
    dispatch(returnBook(email, bookId));
    dispatch(toggleReturnBookPopup());
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/60 overflow-hidden backdrop-blur z-50 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: -20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 20 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="w-full md:w-1/3 bg-white/30 backdrop-blur-2xl rounded-3xl border border-purple-300 p-6 shadow-[0_0_40px_rgba(147,51,234,0.5)] ring-2 ring-purple-400/40"
        >
          <motion.h3
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: [0, -4, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="text-2xl font-extrabold text-center mb-6 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(34,211,238,0.6)] transition-all duration-1000"
          >
            🔄 Return Book
          </motion.h3>

          <form onSubmit={handleReturnBook} className="space-y-6 overflow-hidden">
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
  >
    <motion.label
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="block text-cyan-600 font-semibold mb-2 tracking-wide"
    >
      📧 User Email
    </motion.label>

    <motion.input
      type="email"
      defaultValue={email}
      disabled
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
      className="w-full px-4 py-2 rounded-xl border border-cyan-300 bg-white/30 backdrop-blur-md text-gray-900 
                 placeholder-gray-400 shadow-[inset_0_1px_4px_rgba(0,0,0,0.2)] 
                 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-500 transition-all duration-500"
    />
  </motion.div>

  <motion.div
    className="flex justify-end gap-4 mt-6 overflow-hidden"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
  >
    <motion.button
      type="button"
      onClick={() => dispatch(toggleReturnBookPopup())}
      whileHover={{ scale: 1.06, boxShadow: "0 0 12px rgba(203,213,225,0.7)" }}
      whileTap={{ scale: 0.95 }}
      className="px-5 py-2 rounded-lg font-medium bg-gray-100 text-gray-700 
                 hover:bg-gray-200 transition-all duration-400 shadow-md"
    >
      ❌ Close
    </motion.button>

    <motion.button
      type="submit"
      whileHover={{
        scale: 1.06,
        boxShadow: "0 0 20px rgba(20,184,166,0.8), 0 0 30px rgba(59,130,246,0.6)",
      }}
      whileTap={{ scale: 0.95 }}
      className="px-6 py-2 rounded-lg font-semibold text-white 
                 bg-gradient-to-r from-cyan-400 via-emerald-400 to-blue-500 
                 hover:brightness-110 transition-all duration-500 shadow-xl"
    >
      ✅ Return
    </motion.button>
  </motion.div>
</form>
        </motion.div>
      </div>
    </>
  );
};

export default ReturnBookPopup;
