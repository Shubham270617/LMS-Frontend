import React from "react";
import UserDashboard from "../components/UserDashboard";
import AdminDashboard from "../components/AdminDashboard";
import BookManagement from "../components/BookManagement";
import Catalog from "../components/Catalog";
import Users from "../components/Users";
import MyBorrowedBooks from "../components/MyBorrowedBooks";

const renderComponent = (selectedComponent, user) => {

  switch (selectedComponent) {
    case "Dashboard":
      return user?.role === "User" ? <UserDashboard /> : <AdminDashboard />;
    case "Books":
      return <BookManagement />;
    case "Catalog":
      // Ensure the Admin user is allowed to view the Catalog
      if (user?.role === "Admin") return <Catalog />;
      break;
    case "Users":
      // Ensure the Admin user is allowed to view the Users
      if (user?.role === "Admin") return <Users />;
      break;
    case "My Borrowed Books":
      // Ensure the Admin user is allowed to view Borrowed Books
      if (user?.role === "Admin" || user?.role === "User") return <MyBorrowedBooks />;
      break;
    default:
      // Default fallback: User Dashboard for user role, Admin Dashboard for admin role
      return user?.role === "User" ? <UserDashboard /> : <AdminDashboard />;
  }
};

export default renderComponent;
