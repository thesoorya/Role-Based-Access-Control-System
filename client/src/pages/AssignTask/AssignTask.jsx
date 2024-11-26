import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './AssignTask.css';
import axios from 'axios';
import { StoreContext } from '../../context/Store';
import toast from 'react-hot-toast';

const AssignTask = () => {
    const { id } = useParams();
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [tasks, setTasks] = useState([]);
    const [assigningTask, setAssigningTask] = useState(false);
    const [fetchingTasks, setFetchingTasks] = useState(false);
    const [deletingTask, setDeletingTask] = useState(false);
    const { user } = useContext(StoreContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setAssigningTask(true);
        try {
            await axios.post('/task', {
                title: taskTitle,
                description: taskDescription,
                assignedTo: id,
                assignedBy: user._id,
            });
            setTaskTitle('');
            setTaskDescription('');
            fetchTasks();
            toast.success('Task added');
        } catch (error) {
            console.error('Error assigning task:', error);
        } finally {
            setAssigningTask(false);
        }
    };

    const fetchTasks = async () => {
        setFetchingTasks(true);
        try {
            const response = await axios.get(`/task/getusertasks/${id}`);
            setTasks(response.data);
        } catch (error) {
            console.error('Error in fetching tasks:', error.response?.data?.message || error.message);
        } finally {
            setFetchingTasks(false);
        }
    };

    const handleDeleteTask = async (taskId) => {
        setDeletingTask(true);
        try {
            await axios.delete(`/task/${taskId}`);
            toast.success('Task deleted successfully');
            setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
        } catch (error) {
            console.error('Error in deleting task:', error.response?.data?.message || error.message);
            toast.error(error.response?.data?.message || 'Failed to delete task');
        } finally {
            setDeletingTask(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div className="assign-page">
            <div className="assign-page-form-container">
                <h1>Assign Task</h1>
                <form className="assign-page-form" onSubmit={handleSubmit}>
                    <div className="assign-page-input-container">
                        <input
                            type="text"
                            id="taskTitle"
                            name="taskTitle"
                            value={taskTitle}
                            onChange={(e) => setTaskTitle(e.target.value)}
                            required
                            className="form-input"
                            placeholder="Enter task"
                        />
                    </div>

                    <div className="assign-page-input-container">
                        <textarea
                            id="taskDescription"
                            name="taskDescription"
                            value={taskDescription}
                            onChange={(e) => setTaskDescription(e.target.value)}
                            required
                            className="form-input"
                            placeholder="Enter task description"
                        />
                    </div>
                    <button type="submit" className="form-button" disabled={assigningTask}>
                        {assigningTask ? 'Assigning...' : 'Assign Task'}
                    </button>
                </form>
            </div>

            <div className="assign-page-task-container">
                <div className="assign-page-task-list">
                    <h2 className="assign-page-task-title">Tasks</h2>
                    {fetchingTasks ? (
                        <div style={{ textAlign: 'center' }}>Loading tasks...</div>
                    ) : tasks.length > 0 ? (
                        tasks.map((task) => (
                            <div key={task._id} className="assign-page-task-card">
                                <div className="assign-page-task-divs">
                                    <h2>{task.title}</h2>
                                    <p><b>Description:</b> {task.description}</p>
                                    <p><b>Status:</b> {task.status}</p>
                                    <p><b>Assigned By:</b> {task.assignedBy.name}</p>
                                    <button onClick={() => handleDeleteTask(task._id)} disabled={deletingTask}>
                                        Delete Task
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div style={{ textAlign: 'center' }}>No tasks here.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AssignTask;
