import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../context/Store';
import './Employee.css';
import axios from 'axios';
import toast from 'react-hot-toast';

const Employee = () => {
  const { user } = useContext(StoreContext);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updatingTask, setUpdatingTask] = useState(false);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/task/gettasks`);
      setTasks(response.data);
    } catch (error) {
      console.error('Error in fetching tasks:', error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || 'Failed to fetch tasks.');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    setUpdatingTask(true);
    try {
      const response = await axios.put(`/task/${taskId}`, {
        status: newStatus,
      });
      toast.success('Task status updated successfully');
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, status: response.data.status } : task
        )
      );
    } catch (error) {
      console.error('Error updating task:', error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || 'Failed to update task.');
    } finally {
      setUpdatingTask(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="employee-page">
      <div className="employee-page-user-container">
        <div className="employee-page-user-details">
          <h1>{user.name}</h1>
          <p>{user.email}</p>
          <p>{user.role}</p>
        </div>
      </div>

      <div className="employee-page-task-list">
        <h2 className="employee-page-task-title">
          Employee Panel
        </h2>
        <h3 className="employee-page-task-title">
          Tasks
        </h3>
        {loading ? (
          <div style={{ textAlign: 'center' }}>Loading tasks...</div>
        ) : tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task._id} className="employee-page-task-card">
              <div className="employee-page-task-divs">
                <h2>{task.title}</h2>
                <p><b>Description:</b> {task.description}</p>
                <p><b>Assigned By:</b> {task.assignedBy.name}</p>
                <select
                  value={task.status}
                  onChange={(e) => handleStatusChange(task._id, e.target.value)}
                  disabled={updatingTask}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center' }}>No tasks here.</div>
        )}
      </div>
    </div>
  );
};

export default Employee;
