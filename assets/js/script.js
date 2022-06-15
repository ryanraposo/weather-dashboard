async function getWeather(cityName) {
    // Gets weather for the next five days, including today
    let response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?unitGroup=metric&key=87LGDPGKLB7B6Z7UQKKWNHALH&contentType=json`);
    let data = await response.json();
    let weather = [];
    for (let x = 0; x < 5; x++) {
        const daily = data.days[x];
        let newDaily = {
            city: data.address,
            date: daily.datetime,
            temp: daily.temp,
            humidity: daily.humidity,
            uvindex: daily.uvindex,
            wind: daily.windspeed
        };
        weather.push(newDaily);
    }
    return weather;
}

function applyWeather(weather) {
    // Set Info Panel
    $('#h-info-panel-city').text(weather[0].city);
    $('#p-info-panel-temp').text("Temp: " + weather[0].temp);
    $('#p-info-panel-humidity').text("Humidity: " + weather[0].humidity);
    $('#p-info-panel-UV-Index').text("UV-Index: " + weather[0].uvindex);

    // Set Day One
    $('#h-day-one-date').text(weather[0].date);
    $('#p-day-one-temp').text("Temp: " + weather[0].temp);
    $('#p-day-one-wind').text("Wind: " + weather[0].wind);
    $('#p-day-one-humidity').text("Humidity: " + weather[0].humidity);

    // Set Day Two
    $('#h-day-two-date').text(weather[1].date);
    $('#p-day-two-temp').text("Temp: " + weather[1].temp);
    $('#p-day-two-wind').text("Wind: " + weather[1].wind);
    $('#p-day-two-humidity').text("Humidity: " + weather[1].humidity);

    // Set Day Three
    $('#h-day-three-date').text(weather[2].date);
    $('#p-day-three-temp').text("Temp: " + weather[2].temp);
    $('#p-day-three-wind').text("Wind: " + weather[2].wind);
    $('#p-day-three-humidity').text("Humidity: " + weather[2].humidity);

    // Set Day Four
    $('#h-day-four-date').text(weather[3].date);
    $('#p-day-four-temp').text("Temp: " + weather[3].temp);
    $('#p-day-four-wind').text("Wind: " + weather[3].wind);
    $('#p-day-four-humidity').text("Humidity: " + weather[3].humidity);

    // Set Day Five
    $('#h-day-five-date').text(weather[4].date);
    $('#p-day-five-temp').text("Temp: " + weather[4].temp);
    $('#p-day-five-wind').text("Wind: " + weather[4].wind);
    $('#p-day-five-humidity').text("Humidity: " + weather[4].humidity);

}

function searchCity(input) {
    if (input) {
        let weather = getWeather(input).then(weather => {
            applyWeather(weather);
        });
    }
}

$('#btn-search').click(() => {
    const value = $('#input-search').val().trim();
    searchCity(value);
});

$('#input-search').keypress((e) => {
    if ( e.which == 13 ) {
        e.preventDefault();
        const value = $('#input-search').val().trim();
        searchCity(value);
    }
});
