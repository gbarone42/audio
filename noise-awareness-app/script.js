document.addEventListener("DOMContentLoaded", function () {
	showPage('home');
	generateQuiz();
  });
  
  function showPage(pageId) {
	const pages = document.querySelectorAll('.page');
	pages.forEach(page => {
	  page.style.display = 'none';
	});
	document.getElementById(pageId).style.display = 'block';
  }
  
  function shareOnSocialMedia() {
	const shareUrl = 'http://your-app-url.com';
	const shareMessage = "Sensibilizziamo sull'inquinamento acustico! Scopri di più su Noise Awareness App.";
	if (navigator.share) {
	  navigator.share({
		title: 'Noise Awareness',
		text: shareMessage,
		url: shareUrl
	  }).then(() => {
		console.log('Thanks for sharing!');
	  }).catch(console.error);
	} else {
	  alert('La condivisione sui social media non è supportata su questo browser.');
	}
  }
  
  function generateQuiz() {
	const quizContainer = document.getElementById('quiz-container');
	const questions = [
	  {
		questionText: "Qual è la principale causa dell'inquinamento acustico nelle città?",
		options: [
		  { answerText: "Traffico stradale", isCorrect: true },
		  { answerText: "Pioggia", isCorrect: false },
		  { answerText: "Vento", isCorrect: false },
		  { answerText: "Cani che abbaiano", isCorrect: false }
		]
	  },
	  {
		questionText: "Qual è un effetto comune dell'esposizione a lungo termine all'inquinamento acustico?",
		options: [
		  { answerText: "Miglioramento della memoria", isCorrect: false },
		  { answerText: "Aumento del rischio di malattie cardiache", isCorrect: true },
		  { answerText: "Migliore qualità del sonno", isCorrect: false },
		  { answerText: "Aumento della concentrazione", isCorrect: false }
		]
	  },
	  {
		questionText: "Qual è un buon metodo per ridurre l'inquinamento acustico a casa?",
		options: [
		  { answerText: "Tenere le finestre aperte", isCorrect: false },
		  { answerText: "Utilizzare tappeti e tende pesanti", isCorrect: true },
		  { answerText: "Aumentare il volume della TV", isCorrect: false },
		  { answerText: "Usare solo elettrodomestici rumorosi", isCorrect: false }
		]
	  },
	  {
		questionText: "A quale livello di decibel l'inquinamento acustico diventa dannoso per l'udito umano?",
		options: [
		  { answerText: "40 dB", isCorrect: false },
		  { answerText: "60 dB", isCorrect: false },
		  { answerText: "85 dB", isCorrect: true },
		  { answerText: "100 dB", isCorrect: false }
		]
	  },
	  {
		questionText: "Quale di questi non è una fonte di inquinamento acustico?",
		options: [
		  { answerText: "Traffico aereo", isCorrect: false },
		  { answerText: "Rumore industriale", isCorrect: false },
		  { answerText: "Chitarra acustica suonata dolcemente", isCorrect: true },
		  { answerText: "Concerti", isCorrect: false }
		]
	  },
	  {
		questionText: "Quale organo del corpo è più colpito dall'inquinamento acustico?",
		options: [
		  { answerText: "Cuore", isCorrect: false },
		  { answerText: "Polmoni", isCorrect: false },
		  { answerText: "Orecchie", isCorrect: true },
		  { answerText: "Stomaco", isCorrect: false }
		]
	  },
	  {
		questionText: "Qual è un sintomo comune di esposizione prolungata a rumori forti?",
		options: [
		  { answerText: "Visione offuscata", isCorrect: false },
		  { answerText: "Nausea", isCorrect: false },
		  { answerText: "Acufene (ronzio nelle orecchie)", isCorrect: true },
		  { answerText: "Perdita di capelli", isCorrect: false }
		]
	  },
	  {
		questionText: "Come può l'inquinamento acustico influenzare il sonno?",
		options: [
		  { answerText: "Inducendo sonno profondo", isCorrect: false },
		  { answerText: "Causando interruzioni del sonno", isCorrect: true },
		  { answerText: "Facilitando il rilassamento", isCorrect: false },
		  { answerText: "Aumentando la qualità del sonno", isCorrect: false }
		]
	  },
	  {
		questionText: "Qual è una strategia efficace per proteggere l'udito in ambienti rumorosi?",
		options: [
		  { answerText: "Usare tappi per le orecchie", isCorrect: true },
		  { answerText: "Ascoltare musica ad alto volume", isCorrect: false },
		  { answerText: "Evitare l'uso di cuffie", isCorrect: false },
		  { answerText: "Mantenere le finestre aperte", isCorrect: false }
		]
	  },
	  {
		questionText: "Quale ente mondiale stabilisce le linee guida per i livelli di rumore sicuri?",
		options: [
		  { answerText: "WHO (Organizzazione Mondiale della Sanità)", isCorrect: true },
		  { answerText: "NASA", isCorrect: false },
		  { answerText: "FBI", isCorrect: false },
		  { answerText: "UNICEF", isCorrect: false }
		]
	  }
	];
  
	let currentQuestionIndex = 0;
	let score = 0;
  
	function showQuestion() {
	  const question = questions[currentQuestionIndex];
	  quizContainer.innerHTML = `
		<h3>${question.questionText}</h3>
		<form id="quiz-form">
		  ${question.options.map((option, index) => `
			<label>
			  <input type="radio" name="option" value="${index}">
			  ${option.answerText}
			</label>
			<br>
		  `).join('')}
		  <button type="submit">Rispondi</button>
		</form>
		<p>Punteggio: <span id="score">${score}</span></p>
	  `;
  
	  document.getElementById('quiz-form').addEventListener('submit', function (event) {
		event.preventDefault();
		const selectedOptionIndex = parseInt(document.querySelector('input[name="option"]:checked').value);
		if (question.options[selectedOptionIndex].isCorrect) {
		  score++;
		}
		currentQuestionIndex++;
		if (currentQuestionIndex < questions.length) {
		  showQuestion();
		} else {
		  quizContainer.innerHTML = `<h3>Quiz terminato! Il tuo punteggio è: ${score}</h3>`;
		}
	  });
	}
  
	showQuestion();
  }
  
  // Funzioni per la mappa e le campagne social
  let map;
  let draggableMarker;
  
  function initMap() {
	  map = L.map('map').setView([40.73061, -73.935242], 12); // Default to New York City
  
	  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	  }).addTo(map);
  
	  // Add a draggable marker to the map
	  draggableMarker = L.marker([40.73061, -73.935242], { draggable: true }).addTo(map);
  
	  // Log marker creation
	  console.log('Draggable marker added:', draggableMarker);
  
	  // Update coordinates on marker drag
	  draggableMarker.on('dragend', function(e) {
		  const latlng = e.target.getLatLng();
		  updateAddress(latlng);
		  console.log('Marker dragged to:', latlng);
	  });
  
	  // Handle map clicks to move the marker
	  map.on('click', function(e) {
		  draggableMarker.setLatLng(e.latlng);
		  updateAddress(e.latlng);
		  console.log('Map clicked at:', e.latlng);
	  });
  
	  // Show saved locations
	  showSavedLocations();
  }
  
  function updateAddress(latlng) {
	  document.getElementById('placeAddress').value = `${latlng.lat}, ${latlng.lng}`;
	  console.log('Coordinates set to input field:', `${latlng.lat}, ${latlng.lng}`);
  
	  // Fetch address using reverse geocoding
	  fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latlng.lat}&lon=${latlng.lng}`)
		  .then(response => response.json())
		  .then(data => {
			  if (data.address) {
				  document.getElementById('placeName').value = data.display_name;
				  console.log('Address fetched:', data.display_name);
			  } else {
				  document.getElementById('placeName').value = 'Address not found';
				  console.log('Address not found');
			  }
		  })
		  .catch(error => console.error('Error fetching address:', error));
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
					  draggableMarker.setLatLng(latlng);
					  updateAddress({ lat: data[0].lat, lon: data[0].lon });
					  addNoiseData(latlng);
					  console.log('Location loaded and marker moved to:', latlng);
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
  
	  const heat = L.heatLayer(heatData, {
		  radius: 50,
		  blur: 35,
		  maxZoom: 10,
		  gradient: {
			  0.1: 'blue',
			  0.3: 'lime',
			  0.5: 'yellow',
			  0.7: 'orange',
			  1.0: 'red'
		  }
	  }).addTo(map);
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
		  showRatings();
		  showSavedLocations();
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
  
  function deleteRating(index) {
	  const ratings = JSON.parse(localStorage.getItem('ratings')) || [];
	  ratings.splice(index, 1);
	  localStorage.setItem('ratings', JSON.stringify(ratings));
	  showRatings();
	  showSavedLocations();
  }
  
  function shareOnFacebook(placeName, comment) {
	  const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(location.href)}&quote=${encodeURIComponent(`${placeName}: ${comment}`)}`;
	  window.open(url, '_blank');
  }
  
  function shareOnTwitter(placeName, comment) {
	  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${placeName}: ${comment}`)}&url=${encodeURIComponent(location.href)}`;
	  window.open(url, '_blank');
  }
  
  function showSavedLocations() {
	  const ratings = JSON.parse(localStorage.getItem('ratings')) || [];
	  ratings.forEach(place => {
		  const latlng = place.address.split(',').map(coord => parseFloat(coord));
		  const marker = L.marker(latlng).addTo(map);
		  marker.bindPopup(`<b>${place.name}</b><br>${place.comment}<br>Rating: ${place.rating}/5`).openPopup();
	  });
  }
  
  // Funzioni per il gioco
  let gameScore = 0;
  let gameInterval;
  let timeRemaining = 30;
  
  function startGame() {
	gameScore = 0;
	timeRemaining = 30;
	document.getElementById('score').innerText = gameScore;
	document.getElementById('time-remaining').innerText = timeRemaining;
	const gameArea = document.getElementById('game');
	gameArea.innerHTML = '';
  
	gameInterval = setInterval(() => {
	  if (timeRemaining <= 0) {
		clearInterval(gameInterval);
		alert(`Gioco terminato! Il tuo punteggio è: ${gameScore}`);
		return;
	  }
  
	  const noiseObject = document.createElement('div');
	  noiseObject.classList.add('noise-object');
	  noiseObject.style.top = `${Math.random() * 350}px`;
	  noiseObject.style.left = `${Math.random() * 550}px`;
	  noiseObject.onclick = () => {
		gameScore++;
		document.getElementById('score').innerText = gameScore;
		noiseObject.remove();
	  };
	  gameArea.appendChild(noiseObject);
  
	  timeRemaining--;
	  document.getElementById('time-remaining').innerText = timeRemaining;
	}, 1000);
  }
  