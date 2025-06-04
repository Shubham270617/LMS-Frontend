import React, { useState } from 'react';
import placeholder from '../assets/placeholder.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { addNewAdmin } from '../store/slice/userSlice';
import { FaKey, FaWindowClose } from 'react-icons/fa';
import { toggleAddNewAdminPopup } from '../store/slice/popUpSlice';
import { motion } from 'framer-motion';

export const AddNewAdmin = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setAvatarPreview(reader.result);
      reader.readAsDataURL(file);
      setAvatar(file);
    }
  };

  const handleAddNewAdmin = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('avatar', avatar);
    dispatch(addNewAdmin(formData));
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-70 p-5 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-[700px] bg-gradient-to-br from-[#ffffff10] to-[#ffffff05] rounded-xl shadow-2xl backdrop-blur-md border border-white/20"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-6">
          <header className="flex items-center justify-between mb-7 pb-5 border-b border-white/20">
            <div className="flex items-center gap-3 text-white">
              <FaKey className="h-6 w-6 text-cyan-300" />
              <motion.h3
                className="text-3xl font-bold text-transparent bg-clip-text overflow-hidden bg-gradient-to-r from-cyan-500 via-blue-400 to-purple-500 drop-shadow-[0_0_6px_rgba(100,180,255,0.4)] animate-pulse"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Add New Admin
              </motion.h3>
            </div>
            <FaWindowClose
              className="h-6 w-6 cursor-pointer text-white hover:text-red-400 transition duration-300"
              onClick={() => dispatch(toggleAddNewAdminPopup())}
            />
          </header>

          <form onSubmit={handleAddNewAdmin} className="overflow-auto">
            <div className="relative flex justify-center mb-6 overflow-hidden">
              <motion.label
                htmlFor="idavatarInput"
                className="cursor-pointer overflow-hidden"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                style={{ display: 'inline-block' }}
              >
                <img
                  src={avatarPreview ? avatarPreview : placeholder}
                  alt="avatar"
                  className="object-cover h-28 w-28 rounded-full overflow-hidden border-4 border-cyan-400 shadow-lg shadow-cyan-500/30 transition hover:shadow-cyan-400 duration-300 mb-4 "
                />
                <input
                  type="file"
                  id="idavatarInput"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </motion.label>
            </div>

            {/* Input Fields */}
            <motion.div
              className="mb-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label className="block text-cyan-200 mb-1 font-semibold">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Admin's Name"
                className="w-full p-3 rounded-md bg-white/5 text-white border border-cyan-400 focus:outline-none focus:ring-2 focus:ring-pink-400 placeholder:text-pink-200 transition-all shadow-[0_0_15px_#0ff3]"
              />
            </motion.div>

            <motion.div
              className="mb-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block text-pink-200 mb-1 font-semibold">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Admin's Email"
                className="w-full p-3 rounded-md bg-white/5 text-white border border-pink-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder:text-cyan-200 transition-all shadow-[0_0_15px_#ff0ff0]"
              />
            </motion.div>

            <motion.div
              className="mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <label className="block text-indigo-200 mb-1 font-semibold">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Admin's Password"
                className="w-full p-3 rounded-md bg-white/5 text-white border border-indigo-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder:text-yellow-100 transition-all shadow-[0_0_15px_#ccf3]"
              />
            </motion.div>

            {/* Glowing Buttons */}
            <div className="flex justify-end space-x-4 overflow-hidden">
              <motion.button
                type="button"
                onClick={() => dispatch(toggleAddNewAdminPopup())}
                whileHover={{ scale: 1.05 }}
                className="px-5 py-2 rounded-md bg-gradient-to-r from-gray-600 to-gray-800 text-white shadow-inner hover:shadow-cyan-200/50 transition duration-300"
              >
                Close
              </motion.button>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.1 }}
                className="px-6 py-2 rounded-md font-semibold text-white bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 shadow-lg shadow-cyan-400/40 hover:shadow-cyan-300/80 transition duration-300"
              >
                Add Admin
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AddNewAdmin;
