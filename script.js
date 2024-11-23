document.addEventListener("DOMContentLoaded", () => {
    const video = document.getElementById("birthday-video");
    const muteButton = document.getElementById("mute-toggle");

    const ipDisplay = document.getElementById("ip-address");
    const locationDisplay = document.getElementById("location");
    const mapContainer = document.getElementById("map");

    // Fetch IP Address and Location Information
    fetch("https://ipinfo.io/json?token=237ad279b9f539") // Replace with your token
        .then(response => response.json())
        .then(data => {
            // Display IP and location
            ipDisplay.textContent = data.ip;
            const { city, region, country, loc } = data;
            locationDisplay.textContent = `${city}, ${region}, ${country}`;

            // Initialize map
            const [latitude, longitude] = loc.split(",");
            const map = L.map(mapContainer).setView([latitude, longitude], 13);
            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            }).addTo(map);
            L.marker([latitude, longitude])
                .addTo(map)
                .bindPopup(`You're here: ${city}, ${region}`)
                .openPopup();
        })
        .catch(error => {
            console.error("Error fetching IP or location:", error);
            ipDisplay.textContent = "Unable to fetch IP 😞";
            locationDisplay.textContent = "Unable to fetch location 😞";
        });

    // Mute/Unmute Video
    muteButton.addEventListener("click", () => {
        if (video.muted) {
            video.muted = false;
            muteButton.textContent = "Mute";
        } else {
            video.muted = true;
            muteButton.textContent = "Unmute";
        }
    });
});
