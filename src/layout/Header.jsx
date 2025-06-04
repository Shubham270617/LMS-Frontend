import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUser } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { toggleSettingPopup } from "../store/slice/popUpSlice";
import { motion } from "framer-motion";
import { GiHamburgerMenu } from "react-icons/gi";


export const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");


    

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const hours = now.getHours() % 12 || 12;
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const ampm = now.getHours() >= 12 ? "PM" : "AM";
      setCurrentTime(`${hours}:${minutes} ${ampm}`);

      const options = {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
      };
      setCurrentDate(now.toLocaleDateString("en-US", options));
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 70, damping: 15 }}
      className="relative top-0 left-0 z-0 w-full md:z-40 px-4 py-2 bg-gradient-to-r from-indigo-600 via-purple-700 to-pink-600 shadow-xl transition-all duration-700"
    >
      <div className="flex justify-between items-center overflow-hidden">
        {/* Left Side */}
        <motion.div
          className="flex items-center gap-5 relative overflow-visible"
          whileHover={{ scale: 1.03 }}
        >
          <motion.div
            className="relative overflow-visible"
            animate={{ scale: [1, 1.05, 1], filter: ["brightness(1)", "brightness(1.4)", "brightness(1)"] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <FaUser className="h-6 w-8 text-cyan-100 drop-shadow-[0_0_6px_rgba(0,255,255,0.6)] transition-all duration-300" />
          </motion.div>
          <div className="flex flex-col">
            <motion.span
              className="text-lg font-bold text-cyan-100 drop-shadow-[0_0_5px_rgba(255,255,255,0.6)] transition-all duration-300"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {user && user.name}
            </motion.span>
            <motion.span
              className="text-sm text-cyan-200 drop-shadow-[0_0_4px_rgba(0,255,255,0.6)] transition-all duration-300"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {user && user.role}
            </motion.span>
          </div>
        </motion.div>



        {/* Right Side */}
        <div className="hidden md:flex items-center gap-6 overflow-hidden">
          <motion.div
            className="flex flex-col text-sm lg:text-base font-semibold text-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.span
              
              animate={{ opacity: [0, 1], y: [5, 0] }}
              transition={{ duration: 0.4 }}
              className="drop-shadow-[0_0_4px_rgba(255,255,255,0.6)]"
            >
              {currentTime}
            </motion.span>
            <motion.span
           
              animate={{ opacity: [0, 1], y: [-5, 0] }}
              transition={{ duration: 0.4 }}
              className="text-white/80 drop-shadow-[0_0_3px_rgba(255,255,255,0.5)]"
            >
              {currentDate}
            </motion.span>
          </motion.div>

          <div className="h-10 w-[2px] bg-white/40 rounded-full overflow-hidden" />

          <motion.div
            whileHover={{ rotate: 25, scale: 1.2 }}
            transition={{ type: "spring", stiffness: 200 }}
            onClick={() => dispatch(toggleSettingPopup())}
            className="cursor-pointer overflow-hidden"
          >
            <IoSettingsSharp className="h-7 w-7 text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.6)] transition-all duration-300 overflow-hidden" />
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
