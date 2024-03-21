import React, { useState } from 'react';
import { db } from './firebase';
import './style.css';
import { Link } from 'react-router-dom';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

const Sign_up = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dbRef = collection(db, "Auth");

    const signUp = async (e) => {
        e.preventDefault();  
        try {
            // Check if the email already exists
            const q = query(dbRef, where("Email", "==", email));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                window.alert("You already have an account");
                return;
            }

            // If email doesn't exist, create a new account
            await addDoc(dbRef, { Name: name, Email: email, Password: password });
            window.alert("Successfully signed up!");
            console.log("Document successfully written!");
        } catch (error) {
            console.error("Error writing document: ", error);
        }
    }

    return (
        <>
            <div className='container'>
                <div className='form'>
                    <h2>Sign Up</h2>
                    <form onSubmit={signUp}>
                        <div className='box'>
                            <input type='text' placeholder='Username' onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className='box'>
                            <input type='email' placeholder='E-mail' onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className='box'>
                            <input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <p>Already have an account <Link to='/signin'>Sign in</Link></p>
                        <button type="submit">Sign Up</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Sign_up;
