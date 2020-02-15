window.onload = function() {
    const ipUrl = "https://ipinfo.io/json";
    const appId = "appid=166a433c57516f51dfab1f7edaed8413";
    const location = document.getElementById("location");

    httpReqIpAsync(ipUrl);

    function httpReqIpAsync(url, callback) {
        const httpReqIp = new XMLHttpRequest();
        httpReqIp.open("GET", url, true);
        httpReqIp.onreadystatechange = function() {
            if(httpReqIp.readyState == 4 && httpReqIp.status == 200) {
                const jsonIp = JSON.parse(httpReqIp.responseText);
                console.log(jsonIp);
                const city = jsonIp.city;
                const country = jsonIp.country;
                location.innerHTML = `${city}, ${country}`;
                const lat = jsonIp.loc.split(",")[0];
                const lon = jsonIp.loc.split(",")[1];
                console.log(lat+" "+lon)
                const weatherUrl =`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&${appId}`;
                httpReqWeatherAsync(weatherUrl);
            }
        }
        httpReqIp.send();
        
    }
    function httpReqWeatherAsync(url, callback) {
        const httpReqWeather = new XMLHttpRequest();
        httpReqWeather.open("GET", url, true);
        httpReqWeather.onreadystatechange = function() {
            if(httpReqWeather.readyState == 4 && httpReqWeather.status == 200) {
                const jsonWeather = JSON.parse(httpReqWeather.responseText);
                console.log(jsonWeather);
                const description = jsonWeather.weather[0].description;
                const id = jsonWeather.weather[0].id;
                const temperature = jsonWeather.main.temp;
                const tempFaren = Math.round(1.8 * (temperature - 273) + 32);
                const humidity = jsonWeather.main.humidity;
                const windSpeed = jsonWeather.wind.speed;
                const visibility = jsonWeather.visibility;
                const desc = document.getElementById("description");
                desc.innerHTML = `<i id="icon-desc" class="wi wi-owm-${id}"></i><p id="desc">${description}</p>`;
                const temp = document.getElementById("temperature");
                temp.innerHTML = `${tempFaren}<i class="wi wi-thermometer"></i>`;
                const humidityElem = document.getElementById("humidity");
                humidityElem.innerHTML = `${humidity}%`;
                
            }
        }
        httpReqWeather.send();
    }
}