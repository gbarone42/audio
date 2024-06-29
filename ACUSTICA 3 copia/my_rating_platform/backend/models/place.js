const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    name: String,
    location: {
        lat: Number,
        lng: Number,
    },
    rating: Number,
});

module.exports = mongoose.model('Place', placeSchema);
