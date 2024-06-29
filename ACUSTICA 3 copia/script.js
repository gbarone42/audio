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
    // Placeholder for adding noise data overlay
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

// Initialize the map
document.addEventListener('DOMContentLoaded', initMap);
