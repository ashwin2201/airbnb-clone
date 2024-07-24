import { useState, useContext, useEffect } from 'react';
import { differenceInCalendarDays } from 'date-fns';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from './UserContext';

export default function BookingWidget({place}) {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [redirect, setRedirect] = useState('');
    const {user} = useContext(UserContext);

    useEffect(() => {
        if (user) {
            setName(user.name);
        }
    }, [user])

    let numberOfNights = 0;
    if (checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
    }

    async function bookThisPlace() {
        const response = await axios.post('/bookings', {checkIn, checkOut, numberOfGuests, name, phone, 
            price: numberOfNights*place.price, place: place._id})
        const bookingId = response.data._id;
        setRedirect(`/account/bookings/${bookingId}`);
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <div className="bg-white shadow p-4 rounded-2xl">
        <div className="text-2xl text-center">
            Price: ${place.price}  / per night
        </div>

        <div className="border rounded-2xl mt-4">
            <div className="flex">
                <div className="py-3 px-4">
                    <label htmlFor="">Check in: </label>
                    <input onChange={ev => setCheckIn(ev.target.value)} value={checkIn} type="date" />
                </div>
                <div className="py-3 px-4 border-l">
                    <label htmlFor="">Check out: </label>
                    <input onChange={ev => setCheckOut(ev.target.value)} value={checkOut} type="date" />
                </div>
            </div>
            <div className="py-3 px-4 border-t">
                <label htmlFor="">Number of guests:</label>
                <input onChange={ev => setNumberOfGuests(ev.target.value)} value={numberOfGuests} type="number" />
            </div>
            {numberOfNights > 0 && (
                <div className="py-3 px-4 border-t">
                    <label htmlFor="">Your full name:</label>
                    <input onChange={ev => setName(ev.target.value)} value={name} type="text" />
                    <label htmlFor="">Phone number:</label>
                    <input onChange={ev => setPhone(ev.target.value)} value={phone} type="tel" />
                </div>
            )}
        </div>
        <button onClick={bookThisPlace} className="primary mt-4">
            Book this place 
            {checkIn && checkOut && numberOfNights > 0 && (
                <span>: ${numberOfNights * place.price}</span>
            )}
        </button>
    </div>
    )
}