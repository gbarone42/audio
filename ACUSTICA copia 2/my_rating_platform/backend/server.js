const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Place = require('./models/place');

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/my-rating-platform', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.post('/api/places', async (req, res) => {
    const { name, location, rating } = req.body;
    const place = new Place({ name, location, rating });
    await place.save();
    res.json(place);
});

app.get('/api/places', async (req, res) => {
    const places = await Place.find();
    res.json(places);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
