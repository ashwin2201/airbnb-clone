import { Link, Navigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {setUser} = useContext(UserContext);

    const handleLoginSubmit = async (ev) => { 
        ev.preventDefault();
        try {
            const userInfo = await axios.post('/login', {email, password});
            setUser(userInfo.data);
            alert('Logged in!');
            setRedirect(true);
        }
        catch(err) {
            alert('Login failed');
        }
    }

    if (redirect) { 
        return <Navigate to={'/'} />
    }

    return (
        <div className="mt-4 grow flex flex-col justify-center">
            <h1 className="text-4xl text-center mb-4">Login</h1>
            <form className="max-w-md mx-auto" onSubmit = {handleLoginSubmit}>
                <input type="email" placeholder="your@email.com" value={email} onChange = {ev => setEmail(ev.target.value)}/>
                <input type="password" placeholder="password" value={password} onChange = {ev => setPassword(ev.target.value)}/>
                <button className="primary">Login</button>
            </form> 
            <div className="mt-2 text-center text-gray-500">
                Don't have an account yet? <Link className="underline text-black" to={'/register'}>Register</Link></div>
            <div className="mb-64"></div>
        </div>
    );
}