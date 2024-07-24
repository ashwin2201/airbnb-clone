import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import BookingWidget from "../BookingWidget";
import PlaceGallery from "../PlaceGallery";
import AddressLink from "../AddressLink";

export default function PlacePage() {
    const {id} = useParams();
    const [place, setPlace] = useState(null);

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/places/'+id).then(res => {
            setPlace(res.data);
        })
    },[id])

    if (!place) {
        return '';
    }

    return (
        <div className="mt-4 bg-gray-100 -mx-24 pt-8 px-8">
        <div className="mx-16">
            <h1 className="text-3xl">{place.title}</h1>
                <AddressLink place={place} />
                <PlaceGallery place={place} />
                <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
                    <div>
                        <div className="my-4">
                            <h2 className="font-semibold text-2xl">Description</h2>
                            {place.description}
                        </div>
                        <div>
                            Check in: {place.checkIn}<br />
                            Check out: {place.checkOut}<br />
                            Max number of guests: {place.maxGuests}<br />
                        </div>
                    </div>
                    <div>
                        <BookingWidget place={place}/>
                    </div>
                </div>
                <div className="bg-white -mx-24 px-8 py-8 border-t">
                    <div className="mx-16">
                        <div>
                            <h2 className="font-semibold text-2xl">Extra info</h2>
                        </div>
                        <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">{place.extraInfo}</div>
                    </div>
                </div>
        </div>
        </div>
            
    )
}