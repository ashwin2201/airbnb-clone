import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import AddressLink from "../AddressLink";
import PlaceGallery from "../PlaceGallery";
import BookingDates from "../BookingDates";

export default function BookingPlace() {
    const [booking, setBooking] = useState(null);
    const {id} = useParams();

    useEffect(() => {
        if (id) {
            axios.get(`/bookings`).then(res => {
                const foundBooking = res.data.find(({_id}) => _id === id);
                if (foundBooking) {
                    setBooking(foundBooking);
                }
            });
        }
    }, [id])

    if (!booking) { 
        return '';
    }

    return (
        <div className="my-8">
            <h1 className="text-3xl">{booking.place.title}</h1>
            <AddressLink place={booking.place}/>
            <div className="bg-gray-200 p-6 my-6 rounded-2xl flex justify-between items-center">
                <div>
                    <h2 className="text-2xl mb-4">Your booking information:</h2>
                    <BookingDates booking={booking}/>
                </div>
                <div className="bg-primary p-6 text-white rounded-2xl">
                    <h2 className>Total price:</h2>
                    <div className="text-3xl">${booking.price}</div>
                </div>
            </div>
            <PlaceGallery place={booking.place}/>
        </div>
    );
}