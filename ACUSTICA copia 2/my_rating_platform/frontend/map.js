let map;

function initMap() {
    map = L.map('map').setView([40.73061, -73.935242], 12); // Default to New York City

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
}

function addMarkerToMap(place) {
    const marker = L.marker([place.location.lat, place.location.lng]).addTo(map);
    marker.bindPopup(`${place.name} - Rating: ${place.rating}`).openPopup();
}

document.addEventListener('DOMContentLoaded', () => {
    initMap();
    loadPlaces();
});
