import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import Perks from '../Perks';
import axios from 'axios';

export default function PlacesPage() {
    const {action} = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [photos, setPhotos] = useState([]);
    const [photoLink, setPhotoLink] = useState('');
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);

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

    async function addPhotoByLink(ev) {
        ev.preventDefault();
        const {data:filename} = await axios.post('/upload-by-link', {link: photoLink});
        setPhotos([...photos, filename])
        setPhotoLink('');
    }

    function uploadPhoto(ev) {
        console.log("upload photo");
        const files = ev.target.files;
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
            data.append('photos', files[i]);
        }
        axios.post('/upload', data, {
            headers: { 'Content-type': 'multipart/form-data' }
        }).then(res => {
            const { data: filenames } = res;
            setPhotos(prevPhotos => {
                const updatedPhotos = [...prevPhotos, ...filenames];
                console.log(updatedPhotos);
                return updatedPhotos;
            });
        }).catch(error => {
            console.error("Upload error:", error);
        });
    };

    return (
        <div>
            {action !== 'new' && (
                <div className="text-center">
                    <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full" to={'/account/places/new'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Add new place
                    </Link>
                </div>
            )}
            {action === 'new' && (
                <div>
                    <form>
                        {preInput('Title', 'Title should be short and catchy')}
                        <input value={title} type="text" placeholder="title" onChange={ev => setTitle(ev.target.value)}/>
                        {preInput('Address', 'Address to this place')}
                        <input type="text" placeholder="address" onChange={ev => setAddress(ev.target.value)}/>
                        {preInput('Photos', 'more = better')}
                        <div className="flex gap-2">
                            <input value={photoLink} onChange={ev => setPhotoLink(ev.target.value)} type="text" placeholder="add using al ink.."/>
                            <button className="bg-gray-200 px-4 rounded-2xl" onClick={addPhotoByLink}>Add&nbsp;photo</button>
                        </div>
                        <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-8">
                            {photos.length > 0 && photos.map(link => (
                                <div className="h-32 flex" key={link}>
                                    <img src={`http://localhost:4000/uploads/`+link} alt={link} className="rounded-2xl w-full object-cover position-center"/>
                                </div>
                            ))}
                            <label className="h-32 cursor-pointer flex items-center justify-center border bg-transparent rounded-2xl p-2 text-2xl text-gray-600 gap-1">
                                <input type="file" multiple className="hidden" onChange={uploadPhoto}/>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75" />
                                </svg>
                                Upload
                            </label>
                        </div>
                        {preInput('Description', 'describe your place')}
                        <input type="textarea" value={description} onChange={ev => setDescription(ev.target.value)}/>
                        {preInput('Perks', 'what makes your place special?')}
                        <div className="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols- mt-2">
                          <Perks selected={perks} onChange={setPerks}/>
                        </div>
                        {preInput('Extra info', 'anything else we should know?')}
                        <input type="textarea" value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)}/>
                        {preInput('Check in & out times, max guests', 'Add check in and out times. Remember to add in some time for cleaning.')}
                        <div className="grid gap-2 sm:grid-cols-3">
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
                        </div>
                        <button className="primary my-4">Save</button>
                    </form>
                </div>
            )}
        </div>

    )
}
