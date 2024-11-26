import React, { useState, useContext } from "react";
import { StoreContext } from "../../context/Store";
import { useNavigate } from "react-router-dom";
import "./CreateAcc.css";

const CreateAccount = () => {
  const { signup } = useContext(StoreContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData, navigate);
  };

  return (
    <div className="createAcc">
      <form onSubmit={handleSubmit} className="createAcc-form">
        <div className="createAcc-input-container">
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            placeholder="Enter name"
          />
        </div>
        <div className="createAcc-input-container">
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
            placeholder="Enter email"
          />
        </div>
        <div className="createAcc-input-container">
          <input
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
            placeholder="Enter password"
          />
        </div>
        <div className="createAcc-input-container">
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          >
            <option value="employee">Employee</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default CreateAccount;
