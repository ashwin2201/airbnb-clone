const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    place: {type: mongoose.Schema.Types.ObjectId, ref: 'Place'}, 
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}, 
    checkIn: {type: Date, required: true},
    checkOut: {type: Date, required: true},
    name: {type: String, required: true},
    phone: {type: String, required: true},
});

const BookingModel = mongoose.model('Booking', bookingSchema);

module.exports = BookingModel;