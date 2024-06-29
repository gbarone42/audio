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

    const heatData = noiseLevels.map(noise => [noise.lat, noise.lng, noise.level / 100]);
    L.heatLayer(heatData, { radius: 25 }).addTo(map);
}

function submitRating(event) {
    event.preventDefault();

    const placeName = document.getElementById('placeName').value;
    const placeAddress = document.getElementById('placeAddress').value;
    const rating = document.getElementById('rating').value;
    const comment = document.getElementById('comment').value;

    if (placeName && placeAddress && rating >= 0 && rating <= 5 && comment) {
        const place = { name: placeName, address: placeAddress, rating: Number(rating), comment };
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

function deleteRating(index) {
    const ratings = JSON.parse(localStorage.getItem('ratings')) || [];
    ratings.splice(index, 1);
    localStorage.setItem('ratings', JSON.stringify(ratings));
    showRatings(); // Refresh the list after deletion
}

function showRatings() {
    const ratings = JSON.parse(localStorage.getItem('ratings')) || [];
    const list = document.getElementById('ratedPlacesList');
    list.innerHTML = '';
    ratings.forEach((place, index) => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        listItem.innerHTML = `
            <div>
                <strong>${place.name} (${place.address}) - Rating: ${place.rating}/5</strong>
                <p>${place.comment}</p>
            </div>
            <div>
                <button onclick="shareOnFacebook('${place.name}', '${place.comment}')" class="btn btn-primary btn-sm">Share</button>
                <button onclick="shareOnTwitter('${place.name}', '${place.comment}')" class="btn btn-info btn-sm">Tweet</button>
                <button onclick="deleteRating(${index})" class="btn btn-danger btn-sm">Delete</button>
            </div>
        `;
        list.appendChild(listItem);
    });
}

function shareOnFacebook(placeName, comment) {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(location.href)}&quote=${encodeURIComponent(`${placeName}: ${comment}`)}`;
    window.open(url, '_blank');
}

function shareOnTwitter(placeName, comment) {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${placeName}: ${comment}`)}&url=${encodeURIComponent(location.href)}`;
    window.open(url, '_blank');
}

// Initialize the map
document.addEventListener('DOMContentLoaded', () => {
    initMap();
});
