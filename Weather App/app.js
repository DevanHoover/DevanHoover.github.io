apiUrl = 'https://api.open-meteo.com/v1/forecast?latitude=36.1628&longitude=-85.5016&hourly=temperature_2m,relative_humidity_2m,precipitation,visibility&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=auto'

async function getWeather() {
    try {
        const response = await fetch(apiUrl);
        if(!response.ok) {
            throw new Error('Weather Not Connecting Oh No!');
        }
        const data = await response.json();
        console.log("Weather Stuff:", data);

        const temp = data.hourly.temperature_2m[0];
        const humidity = data.hourly.relative_humidity_2m[0];

        const precipitation = data.hourly.precipitation[0];
        if(precipitation == null || precipitation == undefined) {
            precipitation = '0%';
        }
        const visibility = (data.hourly.visibility[0] * 0.000621371).toFixed(2); // converts meters to miles 
        



        document.querySelector('.temp').innerHTML = temp + '°F';
        document.querySelector('.humidity').innerHTML = humidity + '%';
        document.querySelector('.precipitation').innerHTML = precipitation + ' in';
        document.querySelector('.visibility').innerHTML = visibility + ' mi';

    } catch (notGood) {
        console.error("Weather data no good:", notGood);
    }
}

getWeather();