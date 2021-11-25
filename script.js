// console.log("winning")


const myKey = "cb15120a874ba7b3d3c9ff343bd7f119"
// const urlPrim = (`https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&units=imperial&appid=${myKey}`)
// const urlSnd =  (`https://api.openweathermap.org/data/2.5/forecast?q=${searchInput}&units=imperial&appid=${myKey}`)
// const apiRoot = (`https://api.openweathermap.org`)

// global variables for use in the template
let cName;
let date;
let temp;
let humid;
let wind;
let wpic;
let cityw;

const searchInput = document.querySelector('#locationInputtext')
const searchbtn= document.querySelector('#searchButton')







//make a call to the api with the search button info
//template taken from inclass 10===================
// current weather api call===============================================================================
function getcurrentweather(searchCity) {
   
    
    const requestUrl = (`https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&units=imperial&appid=${myKey}`)
    document.querySelector('#cityName').textContent = '';
    // document.querySelector('#theDate').textContent = '';
    document.querySelector('#cityTemp').textContent = '';
    document.querySelector('#cityHumid').textContent = '';
    document.querySelector('#cityWind').textContent = '';
    document.querySelector('#cityweather').textContent = '';
    // document.querySelector('#wIcon').textContent = '';

    
    fetch(requestUrl)
        .then(function (response) {
            console.log(requestUrl, "URL in use")
            // console.log(response)
            return response.json();
        })
        .then(function (response) {
// ------------values from data
            console.log(response)
            cName=response.name;
            // date=
            temp=response.main.temp
            humid=response.main.humidity
            wind=response.wind.speed
            cityw=response.weather[0].description
            // wpic=
// -----------change values
        document.querySelector('#cityName').textContent = cName;
         // document.querySelector('#theDate').textContent = '';
        document.querySelector('#cityTemp').textContent = "Temperature: " +temp+ " F ";
        document.querySelector('#cityHumid').textContent = "Humidity: " +humid+ " % ";
        document.querySelector('#cityWind').textContent = "Windspeed: " +wind+ " m/ph ";
        document.querySelector('#cityweather').textContent = cityw;
        // document.querySelector('#wIcon').textContent = '';

        })
        .catch(function(err) {
            console.error(err);
        });
        // .then(function (data) {
        //     //     console.log(data);
            // -----function for rendering the data
        //     for (var i = 0; i < data.length; i++) {
        //         //Creating a h3 element and a p element
        //         var userName = document.createElement('h3');
        //         var userUrl = document.createElement('p');

        //         //Setting the text of the h3 element and p element.
        //         userName.textContent = data[i].login;
        //         userUrl.textContent = data[i].url;

        //         //Appending the dynamically generated html to the div associated with the id="users"
        //         //Append will attach the element as the bottom most child.
        //         usersContainer.append(userName);
        //         usersContainer.append(userUrl);
        //     }
        // });
}

// =======================5 day forcast api call=========================
function getWeatherForcast(searchCity) {


    const requestUrl = (`https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&units=imperial&appid=${myKey}`)


    fetch(requestUrl)
        .then(function (response) {
            console.log(requestUrl, "URL2 in use")
            // console.log(response)
            return response.json();
        })
        .catch(function (err) {
            console.error(err);
        });

}


// render response into something that can be used.
// ==================== render data================================

// ===================search btn handler========================================
function handleSearchFormSubmit(e) {
    e.preventDefault();
    var search = searchInput.value.trim();
    getcurrentweather(search) 
    getWeatherForcast (search)
};

searchbtn.addEventListener('click', handleSearchFormSubmit);


// <h2 id='cityName'>x</h2>
// <p id='theDate'>x</p>
// <p id='cityTemp'>x</p>
// <p id='cityHumid'>x</p>
// <p id='cityWind'></p>



// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and 
// THEN that city is added to the search history

// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather
// conditions the temperature, the humidity, the wind speed, and the UV index

// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the 
// conditions are favorable, moderate, or severe

// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, 
// an icon representation of weather conditions, the temperature, the wind speed, 
// and the humidity

// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city


// current weather data
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

// 5 day weather forecast
// https://api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}

// const url = "https://api.openweathermap.org/data/2.5/forecast?q=austin&appid=cb15120a874ba7b3d3c9ff343bd7f119";
// https://api.openweathermap.org/data/2.5/weather?q=austin&appid=cb15120a874ba7b3d3c9ff343bd7f119
