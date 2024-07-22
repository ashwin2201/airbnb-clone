const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}, // owner is a user
    title: String,
    address: String,
    photos: [String],
    description: String,
    perks: [String],
    extraInfo: String,
    checkIn: Number,
    checkOut: Number,
    maxGuests: Number,
    price: Number
});

const PlaceModel = mongoose.model('Place', placeSchema);

module.exports = PlaceModel;