import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { setAuthToken } from '../api';
import './navbar.css';

export default function Navbar(){
    const [token, setToken] = useState(localStorage.getItem('token'));
    useEffect(() => {
        if (token) {
            setAuthToken(token);
        }
    }, [token]);
    return (
        <div className='wrapper'>
        <div className='navbar-left'>
        <h1>TalkChat</h1>
        </div>
        <div className='navbar-right'>
        <nav> 
            <a className='primary-button' href="/">Home</a>
        </nav>
        <nav>
            <a className='primary-button' href="/categories">Categories</a>
        </nav>
        <nav>
            <a className='primary-button' onClick={()=>{
                localStorage.clear();
                setToken(null);
                window.location.href = '/'
            }} >Logout</a>
        </nav>
        </div>
        </div>
    );
}