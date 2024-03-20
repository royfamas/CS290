let map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map-container'), {
        center: { lat: 40.7128, lng: -74.0060 }, // New York City coordinates
        zoom: 12, // Zoom level
    });
}

document.getElementById('destination-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission
    const destinationInput = document.getElementById('destination');
    const modeSelect = document.getElementById('mode');

    const destination = destinationInput.value;
    const mode = modeSelect.value;

    if (!destination) {
        alert('Please enter a destination.');
        return;
    }

    addDestination(destination);
    destinationInput.value = '';
});

function addDestination(destination) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: destination }, function (results, status) {
        if (status === 'OK') {
            const location = results[0].geometry.location;
            const marker = new google.maps.Marker({
                position: location,
                map: map,
                title: destination,
                animation: google.maps.Animation.DROP, // Add animation
                icon: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png' // Custom marker icon
            });
            const infoWindow = new google.maps.InfoWindow({
                content: `<h3>${destination}</h3>` // Show destination name in info window
            });
            marker.addListener('click', function () {
                infoWindow.open(map, marker);
            });
            // Smooth scroll to map
            document.getElementById('map-container').scrollIntoView({ behavior: 'smooth' });
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}
