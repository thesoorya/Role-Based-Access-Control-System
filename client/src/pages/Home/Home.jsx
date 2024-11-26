import React from 'react'
import './Home.css'
import {Link} from 'react-router-dom'

const Home = () => {
    return (
        <div className='home-page'>
            <div className='home-page-header'>
                <h1 className='home-page-title'>Role Based Access Control System</h1>
                <p>
                    Welcome to the Role-Based Access Control System! Our platform streamlines access management by assigning specific roles—Admin, Manager, and Employee. Admins have full control, including user creation and role assignments. Managers oversee tasks and delegate responsibilities, while Employees focus on updating task statuses. Experience seamless collaboration with secure and efficient role-based workflows!
                </p>
            </div>

            <div className="home-page-buttons">
                <Link to={'/login'}>
                    <button>Employee</button>
                </Link>
                <Link to={'/login'}>
                    <button>Manager</button>
                </Link>
                <Link to={'/login'}>
                    <button>Admin</button>
                </Link>
            </div>
        </div>
    )
}

export default Home