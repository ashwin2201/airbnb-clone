import React, {useState} from 'react';
import {Navigate} from 'react-router-dom';
import axios from 'axios';
import Perks from '../Perks';
import PhotosUploader from '../PhotosUploader';
import AccountNav from '../AccountNav';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

export default function PlacesFormPage() {
    const {id} = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [photos, setPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [redirect, setRedirect] = useState(false);
    const [price, setPrice] = useState(100);

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/places/'+id).then(({data}) => {
            setTitle(data.title);
            setAddress(data.address);
            setPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuests(data.maxGuests);
            setPrice(data.price);
        });
    }, [id]);

    function inputHeader(text) {
        return (
            <h2 className="text-2xl mt-4">{text}</h2>
        )
    }

    function inputDescription(text) {
        return (
            <p className="text-gray-500 text-sm">{text}</p>
        )
    }

    function preInput(header, description) {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        )
    }

    async function savePlace(ev) {
        const placeData = {
            title, address, photos, description, 
            perks, extraInfo, checkIn, checkOut, maxGuests, price
        }
        ev.preventDefault();
        if (id) {
            await axios.put('/places', {
                id, ...placeData
            });
            setRedirect(true);
        }
        else {
            await axios.post('/places', {
                placeData
            });
            setRedirect(true);
        }
    }
    
    if (redirect) {
        return <Navigate to={'/account/places'} />
    }

    return (
        <div>
            <AccountNav />
            <form onSubmit={savePlace}>
                {preInput('Title', 'Title should be short and catchy')}
                <input value={title} type="text" placeholder="title" onChange={ev => setTitle(ev.target.value)}/>
                {preInput('Address', 'Address to this place')}
                <input type="text" value={address} placeholder="address" onChange={ev => setAddress(ev.target.value)}/>
                {preInput('Photos', 'more = better')}
                <PhotosUploader photos={photos} onChange={setPhotos}/>
                {preInput('Description', 'describe your place')}
                <textarea value={description} onChange={ev => setDescription(ev.target.value)}/>
                {preInput('Perks', 'what makes your place special?')}
                <div className="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols- mt-2">
                <Perks selected={perks} onChange={setPerks}/>
                </div>
                {preInput('Extra info', 'anything else we should know?')}
                <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)}/>
                {preInput('Check in & out times, max guests', 'Add check in and out times. Remember to add in some time for cleaning.')}
                <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
                    <div>
                        <h3 className="mt-2 -mb-1">Check in time</h3>
                        <input type="text" placeholder="14:00" value={checkIn} onChange={ev => setCheckIn(ev.target.value)}/>
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Check out time</h3>
                        <input type="text" value={checkOut} onChange={ev => setCheckOut(ev.target.value)}/>
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Max number of guests</h3>
                        <input type="number" value={maxGuests} onChange={ev => setMaxGuests(ev.target.value)}/>
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Price per night</h3>
                        <input type="number" value={price} onChange={ev => setPrice(ev.target.value)}/>
                    </div>
                </div>
                <button className="primary my-4">Save</button>
            </form>
        </div>
    )
}