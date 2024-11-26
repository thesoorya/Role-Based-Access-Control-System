import React, { useEffect, useState } from 'react';
import './DisplayTask.css';
import toast from 'react-hot-toast';
import axios from 'axios';

const DisplayTask = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/task/gettasks`);
      setTasks(response.data);
    } catch (error) {
      console.error("Error in fetching data:", error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "Failed to fetch tasks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="task-list">
      <h2 className="task-title">Tasks</h2>
      {loading ? (
        <div style={{ textAlign: 'center' }}>Loading tasks...</div>
      ) : tasks.length > 0 ? (
        tasks.map((task) => (
          <div key={task._id} className="task-card">
            <div className="task-divs">
              <h2>{task.title}</h2>
              <p><b>Description:</b> {task.description}</p>
              <p><b>Status: </b> {task.status}</p>
              <p><b>Assigned By: </b> {task.assignedBy.name}</p>
              <p><b>Assigned To: </b> {task.assignedTo.name}</p>
            </div>
          </div>
        ))
      ) : (
        <div style={{ textAlign: 'center' }}>No tasks here.</div>
      )}
    </div>
  );
};

export default DisplayTask;
