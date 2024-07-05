import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function registerUser(ev) {
        // fetch
        ev.preventDefault();
        axios.post('/register', {
            name, email, password
        });
    }

    return (
        <div className="mt-4 grow flex flex-col justify-center">
            <h1 className="text-4xl text-center mb-4">Register</h1>
            <form className="max-w-md mx-auto" onSubmit={registerUser}>
                <input type="text" placeholder="John Doe" 
                    value={name} 
                    onChange={ev => setName(ev.target.value)}/>
                <input type="email" placeholder="your@email.com" 
                    value={email} 
                    onChange={ev => setEmail(ev.target.value)}/>
                <input type="password" placeholder="password" 
                    value={password} 
                    onChange={ev => setPassword(ev.target.value)}/>
                <button className="primary">Register</button>
            </form> 
            <div className="mt-2 text-center text-gray-500">
                Already a member? <Link className="underline text-black" to={'/login'}>Login</Link></div>
            <div className="mb-64"></div>
            
        </div>
    );
}