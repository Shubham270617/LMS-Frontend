import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBook } from '../store/slice/bookSlice';
import { toggleAddBookPopup } from '../store/slice/popupSlice';
import { motion } from "framer-motion";

const AddBookPopup = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [discription, setDiscription] = useState('');

  const handleAddBook = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('price', price);
    formData.append('quantity', quantity);
    formData.append('discription', discription);
    dispatch(addBook(formData));
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur z-50 flex items-center justify-center overflow-hidden">
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: -20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 20 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full md:w-1/3 bg-opacity-80 backdrop-blur-lg rounded-3xl border border-cyan-400 shadow-[0_0_25px_rgba(34,211,238,0.7)] p-8"
      >
        <h3 className="text-3xl font-extrabold mb-6 text-center
          text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600
          drop-shadow-[0_0_12px_rgba(14,165,233,0.9)] overflow-hidden"
        >
          📚 Add Book
        </h3>

        <form onSubmit={handleAddBook} className="space-y-5">
          <div>
            <label className="block text-cyan-700 font-semibold mb-1">Book Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Book Title"
              required
              className="w-full px-4 py-3 rounded-xl border-2 border-cyan-300 bg-white/40 backdrop-blur-md
                placeholder-cyan-300 text-gray-900 shadow-[inset_0_1px_6px_rgba(14,165,233,0.25)]
                focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-500 transition-all duration-300"
            />
          </div>

          <div>
            <label className="block text-cyan-700 font-semibold mb-1">Book Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Book Author"
              required
              className="w-full px-4 py-3 rounded-xl border-2 border-cyan-300 bg-white/40 backdrop-blur-md
                placeholder-cyan-300 text-gray-900 shadow-[inset_0_1px_6px_rgba(14,165,233,0.25)]
                focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-500 transition-all duration-300"
            />
          </div>

          <div>
            <label className="block text-cyan-700 font-semibold mb-1">Book Price (Price for borrowing)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Book Price"
              required
              className="w-full px-4 py-3 rounded-xl border-2 border-cyan-300 bg-white/40 backdrop-blur-md
                placeholder-cyan-300 text-gray-900 shadow-[inset_0_1px_6px_rgba(14,165,233,0.25)]
                focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-500 transition-all duration-300"
            />
          </div>

          <div>
            <label className="block text-cyan-700 font-semibold mb-1">Book Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Book Quantity"
              required
              className="w-full px-4 py-3 rounded-xl border-2 border-cyan-300 bg-white/40 backdrop-blur-md
                placeholder-cyan-300 text-gray-900 shadow-[inset_0_1px_6px_rgba(14,165,233,0.25)]
                focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-500 transition-all duration-300"
            />
          </div>

          <div>
            <label className="block text-cyan-700 font-semibold mb-1">Description</label>
            <textarea
              value={discription}
              onChange={(e) => setDiscription(e.target.value)}
              placeholder="Book's Description"
              rows={4}
              className="w-full px-4 py-3 rounded-xl border-2 border-cyan-300 bg-white/40 backdrop-blur-md
                placeholder-cyan-300 text-gray-900 shadow-[inset_0_1px_6px_rgba(14,165,233,0.25)]
                focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-500 transition-all duration-300"
            />
          </div>

          <div className="flex justify-end space-x-4 overflow-hidden">
            <motion.button
              type="button"
              onClick={() => dispatch(toggleAddBookPopup())}
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(14,165,233,0.7)" }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 rounded-xl font-semibold bg-gray-100 text-cyan-700 hover:bg-cyan-100 transition-all duration-300 shadow-md"
            >
              ❌ Close
            </motion.button>

            <motion.button
              type="submit"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 25px rgba(14,165,233,0.9), 0 0 35px rgba(6,182,212,0.7)",
              }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 rounded-xl font-semibold text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-700 hover:brightness-110 transition-all duration-300 shadow-lg"
            >
              ➕ Add
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddBookPopup;
