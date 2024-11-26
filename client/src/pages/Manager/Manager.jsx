import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../context/Store';
import './Manager.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Manager = () => {
  const { user } = useContext(StoreContext);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchAllUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/user/getusers');
      setAllUsers(response.data);
      setError('');
    } catch (err) {
      console.error('Error fetching users:', err);
      setError(err.response?.data?.message || 'Failed to fetch users.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="manager-page">
      <div className="manager-page-user-container">
        <div className="manager-page-user-details">
          <h1>{user.name}</h1>
          <p>{user.email}</p>
          <p>{user.role}</p>
        </div>
      </div>
      <div className="manager-page-data-container">
        {loading ? (
          <p style={{ textAlign: 'center' }}>Loading...</p>
        ) : error ? (
          <p style={{ textAlign: 'center' }}>{error}</p>
        ) : (
          <div className="manager-page-user-data-container">
            <h1>Manager Panel</h1>
            <div className='manager-page-user-lists'>
              {allUsers.map((user) => (
                <div key={user._id} className='manager-page-user-list'>
                  <p><b>Name:</b> {user.name}</p>
                  <p><b>Email:</b> {user.email}</p>
                  <p><b>Role:</b> {user.role}</p>
                  <button>
                    <Link to={`/manager-dashboard/assigntask/${user._id}`}>Assign Task</Link>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Manager;
