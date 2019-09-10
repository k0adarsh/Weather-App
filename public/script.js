const searchElement = document.querySelector("[data-city-search]");
const searchBox = new google.maps.places.SearchBox(searchElement);
searchBox.addListener("places_changed", () => {
  const place = searchBox.getPlaces()[0];
  if (place == null) return;
  const latitude = place.geometry.location.lat();
  const longitude = place.geometry.location.lng();
  fetch("/weather", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      latitude: latitude,
      longitude: longitude
    })
  }).then(res => res.json())
    .then(data => {
      //console.log(data);
      setWeatherData(data, place.formatted_address)
    }).catch(err => console.log(err));
})

const icon = new Skycons({ color: '#222' })
const locationElement = document.querySelector('[data-location]');
const statusElement = document.querySelector('[data-status]');
const temperatureElement = document.querySelector('[data-temperature]');
const precipitationElement = document.querySelector('[data-precipitation]');
const windElement = document.querySelector('[data-wind]');
icon.set('icon', 'clear-day');
icon.play();

function setWeatherData(data, place) {
  locationElement.textContent = place
  statusElement.textContent = data.summary
  temperatureElement.textContent = data.temperature
  windElement.textContent = data.windSpeed
  precipitationElement.textContent = `${data.precipProbability * 100}%`
  icon.set('icon', data.icon);
  icon.play();
}