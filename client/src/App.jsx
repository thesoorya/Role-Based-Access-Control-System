import React, { useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { StoreContext } from "./context/Store";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar/Navbar";
import Loader from "./components/Loader/Loader";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Manager from "./pages/Manager/Manager";
import Admin from "./pages/Admin/Admin";
import Employee from "./pages/Employee/Employee";
import User from "./pages/User/User";
import AssignTask from "./pages/AssignTask/AssignTask";

const App = () => {
  const { user, fetchUser, loading } = useContext(StoreContext);

  useEffect(() => {
    fetchUser();
  }, []);

  const isAuthenticated = user !== null;

  const getRedirectPath = () => {
    if (!isAuthenticated) {
      return "/";
    }
    switch (user.role) {
      case "admin":
        return "/admin-dashboard";
      case "manager":
        return "/manager-dashboard";
      case "employee":
        return "/employee-dashboard";
      default:
        return "/";
    }
  };

  if(loading){
    return <Loader />
  }

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to={getRedirectPath()} /> : <Home />} />
          <Route path="/login" element={isAuthenticated ? <Navigate to={getRedirectPath()} /> : <Login />} />
          <Route path="/manager-dashboard" element={isAuthenticated && user.role === "manager" ? <Manager /> : <Navigate to="/" />} />
          <Route path="/manager-dashboard/assigntask/:id" element={isAuthenticated && user.role === "manager" ? <AssignTask /> : <Navigate to="/" />} />
          <Route path="/admin-dashboard" element={isAuthenticated && user.role === "admin" ? <Admin /> : <Navigate to="/" />} />
          <Route path="/admin-dashboard/user/:id" element={isAuthenticated && user.role === "admin" ? <User /> : <Navigate to="/" />} />
          <Route path="/employee-dashboard" element={isAuthenticated && user.role === "employee" ? <Employee /> : <Navigate to="/" />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </div>
  );
};

export default App;
