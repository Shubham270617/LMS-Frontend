import React from 'react';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { toggleReadBookPopup } from '../store/slice/popupSlice';


const ReadBookPopup = ({ book }) => {
  const dispatch = useDispatch();
  return (
    <>
      <div className="fixed inset-0 bg-black/80 backdrop-blur z-50 flex items-center justify-center overflow-hidden">
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: -30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 20 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-11/12 sm:w-1/2 lg:w-1/3 bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_0_30px_rgba(56,189,248,0.6)] border border-cyan-400"
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-cyan-500 via-indigo-500 to-blue-600 rounded-t-3xl shadow-inner overflow-hidden">

<motion.h2
  initial={{ opacity: 0, y: -20 }}
  animate={{
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  }}
  className="relative text-2xl sm:text-3xl font-extrabold text-cyan-900 tracking-wide text-center overflow-hidden"
>
  <motion.span
    animate={{
      textShadow: [
        '0 0 6px rgba(59,130,246,0.8)',
        '0 0 10px rgba(56,189,248,0.9)',
        '0 0 6px rgba(147,51,234,0.8)',
      ],
    }}
    transition={{
      repeat: Infinity,
      repeatType: 'mirror',
      duration: 2.8,
      ease: 'easeInOut',
    }}
    className="inline-block overflow-hidden"
  >
    📖 View Book Info
  </motion.span>
</motion.h2>

          <motion.button
            whileHover={{ scale: 1.2, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => dispatch(toggleReadBookPopup())}
            className="text-white text-2xl font-bold hover:text-red-300 transition-all duration-300"
          >
            &times;
          </motion.button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-cyan-700 font-semibold text-sm mb-1">Book Title</label>
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="px-4 py-2 bg-white/60 rounded-xl border border-cyan-300 shadow-[inset_0_0_10px_rgba(56,189,248,0.2)] text-gray-800 font-medium"
            >
              {book?.title}
            </motion.p>
          </div>

          <div>
            <label className="block text-cyan-700 font-semibold text-sm mb-1">Author</label>
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="px-4 py-2 bg-white/60 rounded-xl border border-cyan-300 shadow-[inset_0_0_10px_rgba(56,189,248,0.2)] text-gray-800 font-medium"
            >
              {book?.author}
            </motion.p>
          </div>

          <div>
            <label className="block text-cyan-700 font-semibold text-sm mb-1">Description</label>
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="px-4 py-3 bg-white/60 rounded-xl border border-cyan-300 shadow-[inset_0_0_10px_rgba(56,189,248,0.2)] text-gray-800 font-medium"
            >
              {book?.discription}
            </motion.p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end px-6 py-4 bg-white/60 rounded-b-3xl">
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: '0 0 15px rgba(34,211,238,0.6)',
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => dispatch(toggleReadBookPopup())}
            className="px-6 py-2 rounded-xl font-semibold bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg hover:brightness-110 transition-all duration-300"
          >
            Close
          </motion.button>
        </div>
      </motion.div>
    </div>
    </>
  );
};

export default ReadBookPopup;
