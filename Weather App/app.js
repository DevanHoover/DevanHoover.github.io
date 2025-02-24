apiUrl = 'https://api.open-meteo.com/v1/forecast?latitude=36.1628&longitude=-85.5016&hourly=temperature_2m,relative_humidity_2m,precipitation,weather_code,visibility&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=auto'

async function getWeather() {
    try {
        const response = await fetch(apiUrl);
        if(!response.ok) {
            throw new Error('Weather Not Connecting Oh No!');
        }
        const data = await response.json();
        console.log("Weather Stuff:", data);

        const currentTime = new Date();

        const timeArray = data.hourly.time.map(t => new Date(t));

        let closestIndex = timeArray.reduce((closestIdx, time, index) => 
            Math.abs(time - currentTime) < Math.abs(timeArray[closestIdx] - currentTime) ? index : closestIdx , 0
        );

        const temp = data.hourly.temperature_2m[closestIndex].toFixed(0) + '°';
        const humidity = data.hourly.relative_humidity_2m[closestIndex] + '%';

        const precipitation = data.hourly.precipitation[closestIndex].toFixed(1);
        const visibility = (data.hourly.visibility[closestIndex] * 0.000621371).toFixed(0); // converts meters to miles 

        const weatherType = data.hourly.weather_code[closestIndex];
        console.log("Weather Type:", weatherType);
        



        document.querySelector('.temp').innerHTML = temp;
        document.querySelector('.humidity').innerHTML = humidity;
        document.querySelector('.precipitation').innerHTML = precipitation + ' in';
        document.querySelector('.visibility').innerHTML = visibility + ' mi';
        document.querySelector('.weatherType').innerHTML = weatherType;
        
        animation = document.querySelector('#right-container img');

        if(weatherType == 0) {
            document.querySelector('.weatherType').innerHTML = 'Clear Skies';
            animation.src = './images/sun.gif';
        } else if(weatherType == 1) {
            document.querySelector('.weatherType').innerHTML = 'Mostly Sunny';
            animation.src = './images/sun.gif';
        }else if(weatherType == 2) {
            document.querySelector('.weatherType').innerHTML = 'Partly Cloudy';
            animation.src = './images/cloudy.gif';
        } else if(weatherType == 3) {
            document.querySelector('.weatherType').innerHTML = 'Overcast';
            animation.src = './images/clouds.gif';
        } else if(weatherType == 48 || 45) {
            document.querySelector('.weatherType').innerHTML = 'Fog';
            animation.src = './images/foggy.gif';
        } 
        else if(weatherType == 61 || 51 || 53 || 55) {
            document.querySelector('.weatherType').innerHTML = 'Light Rain';
            animation.src = './images/rain.gif';
        } else if(weatherType == 63) {
            document.querySelector('.weatherType').innerHTML = 'Moderate Rain';
            animation.src = './images/rain.gif';
        } else if(weatherType == 65) {
            document.querySelector('.weatherType').innerHTML = 'Heavy Rain';
            animation.src = './images/rain.gif';
        } else if(weatherType == 66 || 67 || 56 || 57) {
            document.querySelector('.weatherType').innerHTML = 'Freezing Rain';
            animation.src = './images/hail.gif';
        } else if(weatherType == 71) {
            document.querySelector('.weatherType').innerHTML = 'Light Snow';
            animation.src = './images/snow.gif';
        } else if(weatherType == 73) {
            document.querySelector('.weatherType').innerHTML = 'Moderate Snow';
            animation.src = './images/snow.gif';
        } else if(weatherType == 75 || 77) {
            document.querySelector('.weatherType').innerHTML = 'Heavy Snow';
            animation.src = './images/snow.gif';
        } else if(weatherType == 95) {
            document.querySelector('.weatherType').innerHTML = 'Thunderstorms';
            animation.src = './images/storm.gif';
        } else if(weatherType == 80) {
            document.querySelector('.weatherType').innerHTML = 'Light Showers';
            animation.src = './images/rain.gif';
        } else if(weatherType == 81) {
            document.querySelector('.weatherType').innerHTML = 'Moderate Showers';
            animation.src = './images/rain.gif';
        } else if(weatherType == 82) {
            document.querySelector('.weatherType').innerHTML = 'Heavy Showers';
            animation.src = './images/rain.gif';
        } else if(weatherType == 85) {
            document.querySelector('.weatherType').innerHTML = 'Light Snow Showers';
            animation.src = './images/snow.gif';
        } else if(weatherType == 86) {
            document.querySelector('.weatherType').innerHTML = 'Heavy Snow Showers';
            animation.src = './images/snow.gif';
        } else if(weatherType == 96) {
            document.querySelector('.weatherType').innerHTML = 'Light Hail Showers';
            animation.src = './images/hail.gif';
        } else if (weatherType == 99) {
            document.querySelector('.weatherType').innerHTML = 'Heavy Hail Showers';
            animation.src = './images/hail.gif';
        }   

    } catch (notGood) {
        console.error("Weather data no good:", notGood);
    }
}

getWeather();
setInterval(getWeather, 60000); // updates every hour

setInterval(() => {
    console.log("Force page reload for updates");
    window.location.reload();
}, 60000); // reloads page every hour for updates