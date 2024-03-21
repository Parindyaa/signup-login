import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './style.css'
import { db } from './firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dbRef = collection(db, "Auth");

    const login = async (e) => {
        e.preventDefault();
        try {
            // Check if the username and password match
            const q = query(dbRef, where("Name", "==", username), where("Password", "==", password));
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
                window.alert("Invalid username or password");
                return;
            }

            // Login successful
            window.alert("Login successful!");
            console.log("Login successful!");
        } catch (error) {
            console.error("Error logging in: ", error);
        }
    }

    return (
        <>
            <div className='container'>
                <div className='form'>
                    <h2>Login</h2>
                    <form onSubmit={login}>
                        <div className='box'>
                            <input type='text' placeholder='Username' onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className='box'>
                            <input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <p>Don't have an account <Link to='/'>Sign Up</Link></p>
                        <button type="submit">Login</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login
