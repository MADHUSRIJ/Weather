var currentDate = new Date();
var dayOfWeek = currentDate.getDay();
var daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

var currentDay = daysOfWeek[dayOfWeek];



const url = "820878fa152ed92767a4a4774a6c4aa6";

function getData(api){
    return new Promise(async function (resolve, reject) {
        try {
            await fetch(api)
            .then((res)=> resolve(res.json()))
            .catch((error)=>reject(error));
        }
        catch (exception) {
            reject("Exception : " + exception)
        }
    });
}

async function getAsyncWeather(lat,lon){
    var api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=-${lon}&cnt=8&appid=${url}`
    return await getData(api)
}

async function getAsyncCity(cityName){
    var api = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${url}`;
    var response = await getData(api);
    return await getAsyncWeather(response[0].lat,response[0].lon);
}

getAsyncCity("chennai")
    .then(
       function (data) {
        var divElement = document.getElementById("current-icon");
        divElement.src = `https://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`;
     
        var temp = Math.round((data.current.temp-273) * 100) / 100;
        var divElement2 = document.getElementById("current-temp");
        divElement2.innerHTML =  (temp) + "℃";

        var divElement2 = document.getElementById("current-pressure");
        divElement2.innerHTML =  "Pressure : "+ data.current.pressure+"hPa";

        var divElement2 = document.getElementById("current-humidity");
        divElement2.innerHTML =  "Humidity : "+ data.current.humidity+"%";

        var divElement2 = document.getElementById("current-wind");
        divElement2.innerHTML =  "Wind : "+ data.current.wind_speed + "Km/h";

        var divElement2 = document.getElementById("current-desc");
        divElement2.innerHTML = data.current.weather[0].description;

        var currentDayElement = document.getElementById("day");
        currentDayElement.innerHTML = currentDay;

        var container = document.getElementsByClassName("container-daily")[0];
        container.innerHTML = '';

        var dayOf = dayOfWeek;

        
        for (var i = 1; i <= 7; i++) {
            if(dayOf >= 6){
                dayOf = -1;
            }
            var dayDiv = document.createElement("div");
            dayDiv.classList.add("day");
            dayDiv.className += " d-flex flex-column justify-content-center align-items-center p-2 m-4";

            if(i==1){
                var dayName = document.createElement("p");
                dayName.innerHTML = "Tomorrow";
            }
            else{
                var dayName = document.createElement("p");
                dayName.innerHTML = daysOfWeek[dayOf+1];
            }

            var imgDiv = document.createElement("img");
            imgDiv.src = `https://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png`;

            
            var tempParagraph = document.createElement("p");
            var mintemp = Math.round((data.daily[i].temp.min-273) * 100) / 100;
            var maxtemp = Math.round((data.daily[i].temp.max-273) * 100) / 100;
            tempParagraph.textContent = mintemp+ "℃ - "+maxtemp+"℃";

            dayDiv.appendChild(dayName);
            dayDiv.appendChild(imgDiv);
            dayDiv.appendChild(tempParagraph);

            container.appendChild(dayDiv);
            dayOf++;
        }
    })
    .catch(
        function (error) {
            console.log(error);
        });


function getWeatherData(){
    var id = document.getElementById("city").value;
    getAsyncCity(id)
    .then(
       function (data) {
        var divElement = document.getElementById("current-icon");
        divElement.src = `https://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`;

        var temp = Math.round((data.current.temp-273) * 100) / 100;
        var divElement2 = document.getElementById("current-temp");
        divElement2.innerHTML =  (temp) + "℃";

        var divElement2 = document.getElementById("current-pressure");
        divElement2.innerHTML =  "Pressure : "+ data.current.pressure+"hPa";

        var divElement2 = document.getElementById("current-humidity");
        divElement2.innerHTML =  "Humidity : "+ data.current.humidity+"%";

        var divElement2 = document.getElementById("current-wind");
        divElement2.innerHTML =  "Wind : "+ data.current.wind_speed + "Km/h";

        var divElement2 = document.getElementById("current-desc");
        divElement2.innerHTML = data.current.weather[0].description;

        var currentDayElement = document.getElementById("day");
        currentDayElement.innerHTML = currentDay;

        
        var container = document.getElementsByClassName("container-daily")[0];
        container.innerHTML = '';

        var dayOf = dayOfWeek;

        for (var i = 1; i <= 7; i++) {
            if(dayOf >= 7){
                dayOf = 0;
            }
            var dayDiv = document.createElement("div");
            dayDiv.classList.add("day");
            dayDiv.className += " d-flex flex-column justify-content-center align-items-center p-2 m-4";

            if(i==1){
                var dayName = document.createElement("p");
                dayName.innerHTML = "Tomorrow";
            }
            else{
                var dayName = document.createElement("p");
                dayName.innerHTML = daysOfWeek[dayOf+1];
            }

            var imgDiv = document.createElement("img");
            imgDiv.src = `https://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png`;

            
            var tempParagraph = document.createElement("p");
            var mintemp = Math.round((data.daily[i].temp.min-273) * 100) / 100;
            var maxtemp = Math.round((data.daily[i].temp.max-273) * 100) / 100;
            tempParagraph.textContent = mintemp+ "℃ - "+maxtemp+"℃";

            dayDiv.appendChild(dayName);
            dayDiv.appendChild(imgDiv);
            dayDiv.appendChild(tempParagraph);

            container.appendChild(dayDiv);
            dayOf++;
        }
    })
    .catch(
        function (error) {
            console.log(error);
        });
}
