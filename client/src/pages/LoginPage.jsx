import { Link } from 'react-router-dom';

export default function LoginPage() {
    return (
        <div className="mt-4 grow flex flex-col justify-center">
            <h1 className="text-4xl text-center mb-4">Login</h1>
            <form className="max-w-md mx-auto">
                <input type="email" placeholder="your@email.com"/>
                <input type="password" placeholder="password" />
                <button className="primary">Login</button>
            </form> 
            <div className="mt-2 text-center text-gray-500">
                Don't have an account yet? <Link className="underline text-black" to={'/register'}>Register</Link></div>
            <div className="mb-64"></div>
            
        </div>
    );
}