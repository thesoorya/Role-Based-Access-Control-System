import React, { useContext } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/Store";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logout } = useContext(StoreContext);

  const handleLogout = async () => {
    await logout();
    toast.success('You have been logged out!');
  };

  return (
    <div className="navbar">
      <h3><Link to={'/'}>RBAC</Link></h3>
      {user ? (
        <Link to={"/login"}>
          <button onClick={handleLogout} className="login-btn">Logout</button>
        </Link>
      ) : (
        <Link to={"/login"}>
          <button className="login-btn">Login</button>
        </Link>
      )}
    </div>
  );
};

export default Navbar;
