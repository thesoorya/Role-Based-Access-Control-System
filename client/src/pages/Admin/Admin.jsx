import React, { useContext, useState } from "react";
import { StoreContext } from "../../context/Store";
import "./Admin.css";
import DisplayUsers from "../../components/DisplayUsers/DisplayUsers";
import DisplayTask from "../../components/DisplayTask/DisplayTask";
import Signup from "../../components/CreateAcc/CreateAcc";
import { IoIosClose } from "react-icons/io";

const Admin = () => {
  const { user } = useContext(StoreContext);
  const [activeTab, setActiveTab] = useState("employees");
  const [profileClose, setProfileClose] = useState(false);

  const firstLetter = user?.name?.charAt(0).toUpperCase() || "";

  const renderDataPanel = () => {
    switch (activeTab) {
      case "employees":
        return <DisplayUsers role="employee" />;
      case "managers":
        return <DisplayUsers role="manager" />;
      case "tasks":
        return <DisplayTask />;
      case "create":
        return <div><Signup /></div>;
      default:
        return <p>Select a tab to view data.</p>;
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1 className="admin-panel-title">Admin Panel</h1>
        <div className="admin-profile" onClick={() => setProfileClose(!profileClose)}>
          <p>{firstLetter}</p>
        </div>
      </div>
      <div className="data-tabs">
        <p
          className={`data-tab ${activeTab === "employees" ? "active-tab" : ""}`}
          onClick={() => setActiveTab("employees")}
        >
          Employees
        </p>
        <p
          className={`data-tab ${activeTab === "managers" ? "active-tab" : ""}`}
          onClick={() => setActiveTab("managers")}
        >
          Managers
        </p>
        <p
          className={`data-tab ${activeTab === "tasks" ? "active-tab" : ""}`}
          onClick={() => setActiveTab("tasks")}
        >
          Tasks
        </p>
        <p
          className={`data-tab ${activeTab === "create" ? "active-tab" : ""}`}
          onClick={() => setActiveTab("create")}
        >
          Create Account
        </p>
      </div>
      <div className="data-panel">{renderDataPanel()}</div>

      {
        profileClose && (
          <div className="admin-profile-container">
            <b>{user.name}</b>
            <p>{user.email}</p>
            <small>{user.role}</small>
            <div className="admin-profile-container-close" onClick={() => setProfileClose(!profileClose)}>
              <IoIosClose />
            </div>
          </div>
        )
      }

    </div>
  );
};

export default Admin;
