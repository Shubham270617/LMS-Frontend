import React from 'react';
import { useEffect } from 'react';
import logo_lib from '../assets/logo_lib.png';
import { RiAdminFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { logout, resetAuthSlice } from '../store/slice/authSlice';
import { toast } from 'react-toastify';
import { MdSpaceDashboard } from 'react-icons/md';
import { IoBook } from 'react-icons/io5';
import { GrCatalogOption } from 'react-icons/gr';
import { FaUser } from 'react-icons/fa';
import { FaBookReader } from 'react-icons/fa';
import { IoSettingsSharp } from 'react-icons/io5';
import { BiLogOutCircle } from 'react-icons/bi';
import { FaWindowClose } from 'react-icons/fa';
import { AddNewAdmin } from '../popups/AddNewAdmin';
import { SettingPopup } from '../popups/SettingPopup';
import { toggleAddNewAdminPopup, toggleSettingPopup } from '../store/slice/popUpSlice';
import { motion } from 'framer-motion';

const SideBar = ({ isSideBarOpen, setIsSideBarOpen, setSelectedComponent }) => {
  const dispatch = useDispatch();
  const { addNewAdminPopup, settingPopup } = useSelector((state) => state.popup);
  const { loading, error, message, user, isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
    if (message) {
      toast.success(message);
      dispatch(resetAuthSlice());
    }
  }, [dispatch, isAuthenticated, error, loading, message]);

  const iconVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.1,
      filter: 'drop-shadow(0px 0px 6px #ffffff)',
      transition: { type: 'spring', stiffness: 300 }
    },
  };

  return (
    <>
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
        className={`${
          isSideBarOpen ? 'left-0' : '-left-full'
        } z-30 top-0 transition-all duration-700 md:relative md:left-0 flex flex-col w-64 bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-400 shadow-md h-full md:translate-x-0`}
        style={{ position: 'fixed' }}
      >
        <motion.div
          className="px-6 py-4 my-8"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <img src={logo_lib} alt="logo" className="mx-auto" />
        </motion.div>

        <nav className="flex-1 px-6 space-y-2 text-cyan-100">
          <motion.button
            className="w-full py-2 font-medium rounded-md flex items-center space-x-2"
            onClick={() => setSelectedComponent('Dashboard')}
            variants={iconVariants}
            initial="initial"
            whileHover="hover"
          >
            <MdSpaceDashboard className="h-7 w-8 text-yellow-200" />
            <span className="text-lg">Dashboard</span>
          </motion.button>

          <motion.button
            className="w-full py-2 font-medium rounded-md flex items-center space-x-2"
            onClick={() => setSelectedComponent('Books')}
            variants={iconVariants}
            initial="initial"
            whileHover="hover"
          >
            <IoBook className="h-7 w-8 text-pink-200" />
            <span className="text-lg">Books</span>
          </motion.button>

          {isAuthenticated && user?.role === 'Admin' && (
            <>
              <motion.button
                className="w-full py-2 font-medium rounded-md flex items-center space-x-2"
                onClick={() => setSelectedComponent('Catalog')}
                variants={iconVariants}
                initial="initial"
                whileHover="hover"
              >
                <GrCatalogOption className="h-7 w-8 text-green-200" />
                <span className="text-lg">Catalog</span>
              </motion.button>

              <motion.button
                className="w-full py-2 font-medium rounded-md flex items-center space-x-2"
                onClick={() => {setSelectedComponent('Users')
                  // if (window.innerWidth < 768) setIsSideBarOpen(false);
                }}
                
                variants={iconVariants}
                initial="initial"
                whileHover="hover"
              >
                <FaUser className="h-6 w-8 text-blue-100" />
                <span className="text-lg">Users</span>
              </motion.button>

              <motion.button
                className="w-full py-2 font-medium rounded-md flex items-center space-x-2"
                onClick={() => dispatch(toggleAddNewAdminPopup())}
                variants={iconVariants}
                initial="initial"
                whileHover="hover"
              >
                <RiAdminFill className="w-6 h-6 text-violet-200" />
                <span>Add new Admin</span>
              </motion.button>
            </>
          )}

          {isAuthenticated && user?.role === 'User' && (
            <motion.button
              className="w-full py-2 font-medium rounded-md flex items-center space-x-2"
              onClick={() => setSelectedComponent('My Borrowed Books')}
              variants={iconVariants}
              initial="initial"
              whileHover="hover"
            >
              <FaBookReader className="h-7 w-8 text-orange-200" />
              <span className="text-[17px]">My Borrowed Books</span>
            </motion.button>
          )}

          <motion.button
            className="md:hidden w-full py-2 font-medium rounded-md flex items-center space-x-2"
            onClick={() => dispatch(toggleSettingPopup())}
            variants={iconVariants}
            initial="initial"
            whileHover="hover"
          >
            <IoSettingsSharp className="h-7 w-8 text-rose-200" />
            <span className="text-lg">Update Cred.</span>
          </motion.button>
        </nav>

        <div className="px-6 py-4">
          <motion.button
            className="py-2 font-medium rounded-md flex items-center justify-center space-x-5 mx-auto w-fit"
            onClick={handleLogout}
            variants={iconVariants}
            initial="initial"
            whileHover="hover"
          >
            <BiLogOutCircle className="h-7 w-7 text-white" />
            <span className='text-cyan-50'>Log out</span>
          </motion.button>
        </div>

        <FaWindowClose
          onClick={() => setIsSideBarOpen(!isSideBarOpen)}
          className="h-7 w-7 right-4 top-0 mt-4 block md:hidden absolute text-white"
        />
      </motion.aside>

      {addNewAdminPopup && <AddNewAdmin />}
      {settingPopup && <SettingPopup />}
    </>
  );
};

export default SideBar;