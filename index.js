var weatherForm = document.querySelector('#weather-app form');
var searchInput = document.querySelector('#weather-search');
var weatherSection = document.querySelector('#weather');

var apiKey = 'c6ce7c7d8b09d731207bd112808b4e36';

weatherForm.addEventListener('submit', function(event) {
    event.preventDefault();

    var userQuery = searchInput.value.trim();

    searchInput.value = '';
    weatherSection.innerHTML = '';

    if (!userQuery) {
        return;
    }

    var weatherURL = 'https://api.openweathermap.org/data/2.5/weather';
    var queryString = '?units=imperial&appid=' + apiKey + '&q=' + userQuery;
    var fetchURL = weatherURL + queryString;

    fetch(fetchURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
    if (data.cod != 200) {
        weatherSection.innerHTML = '<h2>Location not found</h2>';
        return;
    }

    var location = document.createElement('h2');
    location.textContent = data.name + ', ' + data.sys.country;
    weatherSection.appendChild(location);

    var mapLink = document.createElement('a');
    mapLink.href = 'https://www.google.com/maps/search/?api=1&query=' +
        data.coord.lat + ',' + data.coord.lon;
    mapLink.target = '__BLANK';
    mapLink.textContent = 'Click to view map';
    weatherSection.appendChild(mapLink);

    var weatherIcon = document.createElement('img');
    weatherIcon.src = 'https://openweathermap.org/img/wn/' +
        data.weather[0].icon + '@2x.png';
    weatherSection.appendChild(weatherIcon);

    var description = document.createElement('p');
    description.textContent = data.weather[0].description;
    description.style.textTransform = 'capitalize';
    weatherSection.appendChild(description);

    weatherSection.appendChild(document.createElement('br'));

    var currentTemp = document.createElement('p');
    currentTemp.textContent = 'Current: ' + data.main.temp + '° F';
    weatherSection.appendChild(currentTemp);

    var feelsLike = document.createElement('p');
    feelsLike.textContent = 'Feels like: ' + data.main.feels_like + '° F';
    weatherSection.appendChild(feelsLike);

    weatherSection.appendChild(document.createElement('br'));

    var date = new Date(data.dt * 1000);
    var timeString = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit'
    });

    var lastUpdated = document.createElement('p');
    lastUpdated.textContent = 'Last updated: ' + timeString;
    weatherSection.appendChild(lastUpdated);
})
        .catch(function(error) {
            console.log(error);
        });
});