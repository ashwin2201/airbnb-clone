import React, { useState } from 'react';
import axios from 'axios';

export default function PhotosUploader({photos, setPhotos}) {
    const [photoLink, setPhotoLink] = useState('');

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
        <>
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
        </>
    );
}