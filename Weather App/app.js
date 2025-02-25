apiUrl = 'https://api.open-meteo.com/v1/forecast?latitude=36.1628&longitude=-85.5016&hourly=temperature_2m,relative_humidity_2m,precipitation,weather_code,visibility&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=auto'

async function getWeather() {
    try {
        const response = await fetch(apiUrl); //get the data from the api
        if(!response.ok) {
            throw new Error('Weather Not Connecting Oh No!');
        }
        const data = await response.json(); //initialize the data
        console.log("Weather Stuff:", data); //output the data to the console

        const currentTime = new Date(); 

        const timeArray = data.hourly.time.map(t => new Date(t));

        let closestIndex = timeArray.reduce((closestIdx, time, index) => 
            Math.abs(time - currentTime) < Math.abs(timeArray[closestIdx] - currentTime) ? index : closestIdx , 0
        );

        const temp = data.hourly.temperature_2m[closestIndex].toFixed(0) + '°'; //initialize temperature to a fixed whole number based on hourly data 
        const humidity = data.hourly.relative_humidity_2m[closestIndex] + '%'; //initialize humidity based on hourly data

        const precipitation = data.hourly.precipitation[closestIndex].toFixed(1); //initialize precipitation to a fixed number rounded to one place based on hourly data
        let visibility = (data.hourly.visibility[closestIndex] * 0.000621371).toFixed(0); // converts meters to miles and initialized visibility

        if(visibility >= 10) {
            visibility = 10;
        } // sets visibility to 10 if greater than 10 miles, considered standard practice for weather apps

        const weatherType = data.hourly.weather_code[closestIndex]; //get the weather code from the hourly data
        console.log("Weather Type:", weatherType); //output the weather code to the console for debugging

        



        document.querySelector('.temp').innerHTML = temp; //output the temperature to the html replacing Temperature
        document.querySelector('.humidity').innerHTML = humidity; //output the humidity to the html replacing Humidity
        document.querySelector('.precipitation').innerHTML = precipitation + ' in'; //output the precipitation to the html replacing Precipitation
        
        document.querySelector('.visibility').innerHTML = visibility + ' mi'; //output the visibility to the html replacing Visibility

        document.querySelector('.weatherType').innerHTML = weatherType; //output the weather type to the html replacing Weather Type
        
        animation = document.querySelector('#right-container img'); //initialize animation to the image located in the right-container

        //Based on weather type, set the weather type and set the animation
        if(weatherType == 0) { 
            document.querySelector('.weatherType').innerHTML = 'Clear Skies';
            animation.src = './images/sun.gif';
        } else if(weatherType == 1 || weatherType == 2) { 
            document.querySelector('.weatherType').innerHTML = 'Partly Cloudy';
            animation.src = './images/cloudy.gif';
        } else if(weatherType == 3) {
            document.querySelector('.weatherType').innerHTML = 'Overcast';
            animation.src = './images/clouds.gif';
        } else if(weatherType == 48 || weatherType == 45) { 
            document.querySelector('.weatherType').innerHTML = 'Fog';
            animation.src = './images/foggy.gif';
        } 
        else if(weatherType == 61 || weatherType == 51 || weatherType == 53 || weatherType == 55) { //if the weather type is 61, 51, 53, or 55, set the weather type to Light Rain and set the animation to the rain gif
            document.querySelector('.weatherType').innerHTML = 'Light Rain';
            animation.src = './images/rain.gif';
        } else if(weatherType == 63) { 
            document.querySelector('.weatherType').innerHTML = 'Moderate Rain';
            animation.src = './images/rain.gif';
        } else if(weatherType == 65) { 
            document.querySelector('.weatherType').innerHTML = 'Heavy Rain';
            animation.src = './images/rain.gif';
        } else if(weatherType == 66 || weatherType == 67 || weatherType == 56 || weatherType == 57) { 
            document.querySelector('.weatherType').innerHTML = 'Freezing Rain';
            animation.src = './images/hail.gif';
        } else if(weatherType == 71) {
            document.querySelector('.weatherType').innerHTML = 'Light Snow';
            animation.src = './images/snow.gif';
        } else if(weatherType == 73) {
            document.querySelector('.weatherType').innerHTML = 'Moderate Snow';
            animation.src = './images/snow.gif';
        } else if(weatherType == 75 || weatherType == 77) {
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

getWeather(); //call get weather to run our function
setInterval(getWeather, 60000); // updates every minute

setInterval(() => {
    console.log("Force page reload for updates");
    window.location.reload();
}, 60000); // reloads page every minute for updates

//Used Chat Gpt to generate lines 14 - 18 to help properly gather the time and use that to output the correct weather data based off what time it is.
//Used Chat Gpt to generate lines 116-119 to properly update the data once added to home screen