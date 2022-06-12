async function getWeather(cityName) {
    // Gets weather for the next five days, including today
    let response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?unitGroup=metric&key=87LGDPGKLB7B6Z7UQKKWNHALH&contentType=json`);
    let data = await response.json();
    let weather = [];
    for (let x = 0; x < 5; x++) {
        let daily = Object.fromEntries(['datetime', 'temp', 'windspeed', 'uvindex', 'humidity'].map((k) => [k, data.days[x][k]]));
        weather.push(daily);   
    }
    return weather;
}

getWeather("toronto").then((result) => {console.log(result)});
