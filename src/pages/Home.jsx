import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import SideBar from "../layout/SideBar";
import renderComponent from "../utils/renderComponent";
import Header from "../layout/Header"; // <- imported for conditional use

const Home = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState("");

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="relative min-h-screen bg-gray-200 md:pl-64 flex flex-col">
      {/* Mobile Hamburger Button */}
      <div className="md:hidden z-50 fixed right-6 top-4 flex justify-center items-center bg-teal-500 rounded-md h-9 w-8 text-white shadow-lg">
        <GiHamburgerMenu
          className="text-2xl"
          onClick={() => setIsSideBarOpen(!isSideBarOpen)}
        />
      </div>

      {/* Sidebar */}
      <SideBar
        isSideBarOpen={isSideBarOpen}
        setIsSideBarOpen={setIsSideBarOpen}
        setSelectedComponent={setSelectedComponent}
      />

      {/* Show Header ONLY for certain components */}
      {selectedComponent === "Users" && <Header />}

      {/* Render dynamic component */}
      <div className="flex-1 relative z-10 pt-6 px-4">
        {renderComponent(selectedComponent, user)}
      </div>
    </div>
  );
};

export default Home;
