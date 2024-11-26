import React, { createContext, useState } from 'react';
import axios from 'axios';
import {toast} from 'react-hot-toast'

export const StoreContext = createContext();

const Store = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [loading, setLoading] = useState(false);

    // Set Axios base URL (optional, for cleaner requests)
    axios.defaults.baseURL = 'https://rbac-server-y2g9.onrender.com/api';
    axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : '';
    axios.defaults.withCredentials = true;

    const signup = async (formData) => {
        setLoading(true);
        try {
            await axios.post('/auth/signup', formData);
            toast.success('Account created')
        } catch (error) {
            console.error('Signup error:', error.response?.data?.message || error.message);
            toast.error(error.response?.data?.message)
        } finally {
            setLoading(false);
        }
    };

    const login = async (formData, navigate) => {
        setLoading(true);
        try {
            const response = await axios.post('/auth/login', formData);
            setToken(response.data.token);
            localStorage.setItem('token', response.data.token);
            setUser(response.data);
            navigate('/')
            toast.success('Login successfull')
        } catch (error) {
            console.error('Login error:', error.response?.data?.message || error.message);
            toast.error(error.response?.data?.message)
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setLoading(true);
        try {
            await axios.post('/auth/logout');
            setToken(null);
            localStorage.removeItem('token');
            setUser(null);
        } catch (error) {
            console.error('Logout error:', error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchUser = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/auth/me');
            setUser(response.data);
        } catch (error) {
            console.error('Fetch user error:', error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    const value = {
        user,
        token,
        loading,
        setLoading,
        signup,
        login,
        logout,
        fetchUser,
    };

    return (
        <StoreContext.Provider value={value}>
            {children}
        </StoreContext.Provider>
    );
};

export default Store;
