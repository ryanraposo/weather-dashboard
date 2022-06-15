async function getWeather(cityName) {
    // Gets weather for the next five days, including today
    let response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?unitGroup=metric&key=87LGDPGKLB7B6Z7UQKKWNHALH&contentType=json`);
    let data = await response.json();
    let weather = [];
    for (let x = 0; x < 5; x++) {
        const daily = data.days[x];
        let newDaily = {
            city: data.address,
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
    const hInfoPanelCity = document.querySelector('#h-info-panel-city');
    hInfoPanelCity.innerText = "City: " + weather[0].city;

    const pInfoPanelTemp = document.querySelector('#p-info-panel-temp');
    pInfoPanelTemp.innerText = "Temp: " + weather[0].temp;

    const pInfoPanelHumidity = document.querySelector('#p-info-panel-humidity');
    pInfoPanelHumidity.innerText = "Humidity: " + weather[0].humidity;

    const pInfoPanelUVIndex = document.querySelector('#p-info-panel-UV-Index')
    pInfoPanelUVIndex.innerText = "UV-Index: " + weather[0].uvindex;
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
