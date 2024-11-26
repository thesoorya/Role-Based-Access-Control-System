import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import './User.css';

const User = () => {
    const { id } = useParams();
    const [idUser, setIdUser] = useState({
        name: '',
        email: '',
        role: 'employee',
    });
    const [userTask, setUserTask] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchIdUser = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/user/${id}`);
            setIdUser({
                name: response.data.name,
                email: response.data.email,
                role: response.data.role,
            });
        } catch (error) {
            console.error('Error fetching user data:', error.response?.data?.message || error.message);
            toast.error(error.response?.data?.message || 'Failed to fetch user data');
        } finally {
            setLoading(false);
        }
    };

    const fetchUserTask = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/task/getusertasks/${id}`);
            setUserTask(response.data);
        } catch (error) {
            console.error('Error fetching user tasks:', error.response?.data?.message || error.message);

        } finally {
            setLoading(false);
        }
    };

    const handleDeleteUser = async () => {
        setLoading(true);
        try {
            await axios.delete(`/user/${id}`);
            toast.success('User deleted')
            navigate('/admin-dashboard')
        } catch (error) {
            console.error('Error deleting user: ', error.response?.data?.message || error.message);
            toast.error(error.response?.data?.message || 'Failed to delete user');
        } finally {
            setLoading(false);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.put(`/user/${id}`, idUser);
            toast.success('User details updated successfully');
            navigate('/admin-dashboard');
        } catch (error) {
            console.error('Error updating user data:', error.response?.data?.message || error.message);
            toast.error(error.response?.data?.message || 'Failed to update user details');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setIdUser((prev) => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        fetchIdUser();
        fetchUserTask();
    }, [id]);

    return (
        <div className='user-page'>
            {loading ? (
                <p style={{textAlign: 'center'}}>Loading user data...</p>
            ) : idUser ? (
                <div className="user-page-edit">
                    <form className="user-page-edit-form" onSubmit={handleSubmit}>
                        <div className="user-page-input-container">
                            <input
                                type="text"
                                name="name"
                                value={idUser.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="user-page-input-container">
                            <input
                                type="email"
                                name="email"
                                value={idUser.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="user-page-input-container">
                            <select name="role" value={idUser.role} onChange={handleChange}>
                                <option value="employee">Employee</option>
                                <option value="manager">Manager</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        <button type="submit" disabled={loading}>
                            {loading ? 'Saving...' : 'Update'}
                        </button>
                        <button onClick={handleDeleteUser} disabled={loading}>
                            {loading ? 'Deleting...' : 'Delete User'}
                        </button>
                    </form>
                    <h2 className='task-title'>User's Tasks</h2>
                    <div className="user-tasks">
                        {userTask.length > 0 ? (
                            <div className='user-task-lists'>
                                {userTask.map((task) => (
                                    <div key={task._id} className='user-task-list'>
                                        <h2>
                                            {task.title}
                                        </h2>
                                        <p>
                                            <b>Description: </b>
                                            {task.description}
                                        </p>
                                        <p>
                                            <b>Status:</b> {task.status}
                                        </p>
                                        <p>
                                            <b>Assigned by:</b> {task.assignedBy.name}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p style={{textAlign: 'center'}}>No tasks assigned to this user.</p>
                        )}
                    </div>
                </div>
            ) : (
                <p>User not found</p>
            )}
        </div>
    );
};

export default User;
