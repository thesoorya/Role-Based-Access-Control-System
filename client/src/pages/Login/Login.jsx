import React, { useState, useContext } from 'react';
import { StoreContext } from '../../context/Store';
import { useNavigate } from 'react-router-dom';
import './Login.css'

const Login = () => {
    const { login } = useContext(StoreContext);
    const navigate = useNavigate()

    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        login(formData, navigate);
    };

    return (
        <div className='login'>
            <h1 className='login_title'>Login</h1>
            <form onSubmit={handleSubmit} className='login_form'>
                <div className="login_items">
                    <div className='login_item'>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                            placeholder='Enter Email'
                        />
                    </div>
                    <div className='login_item'>
                        <input
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                            placeholder='Enter password'
                        />
                    </div>
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    );
};

export default Login;
