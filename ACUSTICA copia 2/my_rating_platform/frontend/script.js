let map;

function initMap() {
    map = L.map('map').setView([40.73061, -73.935242], 12); // Default to New York City

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
}

function loadMap() {
    const location = document.getElementById('locationInput').value;
    if (location) {
        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${location}`)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    const latlng = [data[0].lat, data[0].lon];
                    map.setView(latlng, 12);
                    addNoiseData(latlng);
                } else {
                    alert('Location not found.');
                }
            })
            .catch(error => console.error('Error fetching location data:', error));
    } else {
        alert('Please enter a location.');
    }
}

function addNoiseData(location) {
    const noiseLevels = [
        { lat: parseFloat(location[0]) + 0.01, lng: parseFloat(location[1]), level: 50 },
        { lat: parseFloat(location[0]) - 0.01, lng: parseFloat(location[1]), level: 70 },
        { lat: parseFloat(location[0]), lng: parseFloat(location[1]) + 0.01, level: 60 },
    ];

    noiseLevels.forEach(noise => {
        L.circle([noise.lat, noise.lng], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: noise.level * 10
        }).addTo(map);
    });
}

function submitRating(event) {
    event.preventDefault();

    const placeName = document.getElementById('placeName').value;
    const placeAddress = document.getElementById('placeAddress').value;
    const rating = document.getElementById('rating').value;

    if (placeName && placeAddress && rating >= 0 && rating <= 5) {
        const place = { name: placeName, address: placeAddress, rating: Number(rating) };
        saveRating(place);
        document.getElementById('ratingForm').reset();
    } else {
        alert('Please provide valid inputs.');
    }
}

function saveRating(place) {
    const ratings = JSON.parse(localStorage.getItem('ratings')) || [];
    ratings.push(place);
    localStorage.setItem('ratings', JSON.stringify(ratings));
}

function showRatings() {
    const ratings = JSON.parse(localStorage.getItem('ratings')) || [];
    const list = document.getElementById('ratedPlacesList');
    list.innerHTML = '';
    ratings.forEach(place => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        listItem.textContent = `${place.name} (${place.address}) - Rating: ${place.rating}/5`;
        list.appendChild(listItem);
    });
}

// Initialize the map
document.addEventListener('DOMContentLoaded', () => {
    initMap();
});
