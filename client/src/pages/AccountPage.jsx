import { useState, useContext } from "react"
import { UserContext } from "../UserContext"
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";

export default function AccountPage() {
    const {ready, user, setUser} = useContext(UserContext);
    const [redirect, setRedirect] = useState(false);

    let {subpage} = useParams();

    if (!ready) {
        return 'Loading...'; 
    }

    if (!user && ready && !redirect) {
        return <Navigate to={'/login'} />
    }

    if (subpage === undefined) {
        subpage = 'profile';
    }

    const logout = async () => {
        await axios.post('/logout');
        setRedirect('/');
        setUser(null);
    }

    function linkClasses(type=null) {
        let classes = 'py-2 px-6';
        if (type === subpage) { // if selected
            classes += ' bg-primary text-white rounded-full';
        }
        return classes;
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <div>
            <nav className="w-full flex mt-8 justify-center gap-2 mb-8">
                <Link className={linkClasses('profile')} to={'/account'}>My profile</Link>
                <Link className={linkClasses('bookings')} to={'/account/bookings'}>My bookings</Link>
                <Link className={linkClasses('places')} to={'/account/places'}>My accomodations</Link>
            </nav>
            {
                subpage === 'profile' && (
                    <div className="text-center max-w-lg mx-auto">
                        Logged in as {user.name} ({user.email})<br />
                        <button className="primary max-w-sm mt-2" onClick={logout}>Logout</button>
                    </div>
                )
            }
        </div>

    )
}