//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
//555c7d40572a2df58285c0ee598ad5eb
const weatherApi = {
    key: "555c7d40572a2df58285c0ee598ad5eb",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather"
}
const searchInputBox = document.getElementById('input-box');
searchInputBox.addEventListener('keypress', (event) => {
    if (event.keyCode == 13) {
        console.log(searchInputBox.value);
        getWeatherReport(searchInputBox.value);
        document.querySelector('.weather-body').style.display="block";
    }
});

function getWeatherReport(city) {
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
        .then(weather => {
            return weather.json();
        }).then(showWeatherReport);
}
function showWeatherReport(weather) {
    console.log(weather);
    let city = document.getElementById('city');
    city.innerHTML = `${weather.name}, ${weather.sys.country}`
    let temperature = document.getElementById('temp');
    temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;
    let minMaxTemp = document.getElementById('min-max');
    minMaxTemp.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C (min)/ ${Math.ceil(weather.main.temp_max)}&deg;C (max) `;
    let weatherType = document.getElementById('weather');
    weatherType.innerHTML=`${weather.weather[0].main}`;

    let date =document.getElementById('date');
    let todayDate = new Date();
    date.innerHTML=dateManage(todayDate);

    if(weatherType.textContent=='Clear'){
        document.body.style.backgroundImage = "url('images/clear.jpg')";
    }
    else if(weatherType.textContent=='Clouds'){
        document.body.style.backgroundImage = "url('images/cloudyimage.jpg')";
    }

    else if(weatherType.textContent=='Haze'){
        document.body.style.backgroundImage = "url('images/Hazeimage.jpg')";
    }

    else if(weatherType.textContent=='Snow'){
        document.body.style.backgroundImage = "url('images/snowimage.jpg')";
    }
    else if(weatherType.textContent=='Rain'){
        document.body.style.backgroundImage = "url('images/rainimage.jpg')";
    }
}
function dateManage(datearg){
 let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
let months = ["January","Febuary","March","April","May","June","July","August","September","October","November","December"];
let year = datearg.getFullYear();
let month = months[datearg.getMonth()];
let date =  datearg.getDate();
let day = days[datearg.getDay()];

return `  ${date} ${month} (${day}) ${year}`
}