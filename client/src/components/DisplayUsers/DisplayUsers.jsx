import React, { useContext, useEffect, useState } from "react";
import "./DisplayUsers.css";
import axios from "axios";
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import {Link} from 'react-router-dom'

const DisplayUsers = ({ role }) => {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`/user/getbyrole/${role}`);
            setUsers(response.data);
        } catch (error) {
            console.error("Error in fetching data:", error.response?.data?.message || error.message);
            toast.error(error.response?.data?.message || "Failed to fetch users.");
        }
    };
    useEffect(() => {
        fetchUsers()
    }, [role])

    return (
        <div className="users-list">
            <h2 className="user-title">{role} Table</h2>
            <div className="user-cards">
                {users.length > 0 ? (
                    users.map((user) => (
                        <div key={user._id} className="user-card">
                            <p><b>{user.name}</b></p>
                            <p className="user-email">{user.email}</p>
                            <p className="user-role">{user.role}</p>
                            <p className="user-edit-link"><Link to={`/admin-dashboard/user/${user._id}`} ><FaEdit /></Link></p>
                        </div>
                    ))
                ) : (
                    <div style={{ textAlign: 'center' }}>No {role}s found.</div>
                )}
            </div>

        </div>
    );
};

export default DisplayUsers;
