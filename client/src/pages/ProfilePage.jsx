import { useState, useContext } from "react"
import { UserContext } from "../UserContext"
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../AccountNav";

export default function ProfilePage() {
    const {ready, user, setUser} = useContext(UserContext);
    const [redirect, setRedirect] = useState(false);

    let {subpage} = useParams();

    if (!ready) {
        return 'Loading...'; 
    }

    if (!user && ready && !redirect) {
        return <Navigate to={'/login'} />
    }

    const logout = async () => {
        await axios.post('/logout');
        setRedirect('/');
        setUser(null);
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <div>
            <AccountNav/>
            {subpage === 'profile' && (
            <div className="text-center max-w-lg mx-auto">
                Logged in as {user.name} ({user.email})<br />
                <button className="primary max-w-sm mt-2" onClick={logout}>Logout</button>
            </div>
            )}
            {subpage === 'places' && (<PlacesPage/>)}
        </div>

    )
}