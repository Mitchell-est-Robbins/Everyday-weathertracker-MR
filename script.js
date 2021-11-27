// console.log("winning")


const myKey = "cb15120a874ba7b3d3c9ff343bd7f119"
// var searchHistory = [];

// global variables for use in the template
let cName,
    date,
    temp,
    humid,
    wind,
    wpic,
    cityw,
    uvi,
    longBit,
    latBit,
    oneCallURL;

    //special defined ones
let wIcon= document.querySelector('#wIcon'); //thanks for that google...
let uvicolor= document.querySelector('#cityuvi')

const searchInput = document.querySelector('#locationInputtext')
const searchbtn= document.querySelector('#searchButton')






//make a call to the api with the search button info

// =======================ONE CALL=========================
function getOnecallcurrent(oneCallURL) {
//------------------------makes the call

    fetch(oneCallURL)
    
        .then(function (response) {
            // console.log("onecall in use:" ,oneCallURL);
            return response.json();
        })
        .then(function (response) {

            // ------------values from data

            // console.log(response);
            // cName = response.name;
            date= moment().format("MM/DD/YYYY")
            temp = response.current.temp;
            humid = response.current.humidity;
            wind = response.current.wind_speed;
            cityw = response.current.weather[0].description;
            wpic = `https://openweathermap.org/img/w/${response.current.weather[0].icon}.png`;
            cityuvi= response.current.uvi;
            // -----------change values on page

            document.querySelector('#cityName').textContent = cName;
            document.querySelector('#theDate').textContent = date;
            document.querySelector('#cityTemp').textContent = "Temperature: " + temp + " F ";
            document.querySelector('#cityHumid').textContent = "Humidity: " + humid + " % ";
            document.querySelector('#cityWind').textContent = "Windspeed: " + wind + " m/ph ";
            document.querySelector('#cityweather').textContent = cityw;
            document.querySelector('#cityuvi').textContent = "UVIndex:" + cityuvi;
            wIcon.setAttribute('src', wpic)

            // https://en.wikipedia.org/wiki/Ultraviolet_index 
            if(cityuvi < 3){ uvicolor.style.backgroundColor = "green" }
            else if ( cityuvi > 3 && cityuvi < 6){ uvicolor.style.backgroundColor = "yellow" }
            else if ( cityuvi > 6 && cityuvi < 7){ uvicolor.style.backgroundColor = "orange" }
            else{uvicolor.style.backgroundColor = "red"}

            // console.log('made it');


//-------------same API call now creating the forecast cards
            let fiveDayApiData = response.daily.slice(1, 6);
            for (let i = 0; i < fiveDayApiData.length; i++) {
                let fiveDayArr = fiveDayApiData[i];
                // console.log("FIVE DAY ARRAY: ", fiveDayArr)   

            fdaydate = moment().add(i+1, 'days').format("MM/DD/YYYY");
            fdaytemp =fiveDayArr.temp.day;
            fdayhumid =fiveDayArr.humidity;
            fdaywind= fiveDayArr.wind_speed;
            fdayuvi= fiveDayArr.uvi;
            fdayiconurl =`https://openweathermap.org/img/w/${fiveDayArr.weather[0].icon}.png`;

            let cardtemplate = document.createElement('div'); //col
            cardtemplate.setAttribute( 'class', 'col-md');
            let card = document.createElement('div')
            card.setAttribute('class', 'card');
            let cardtext= document.createElement('div')
            cardtext.setAttribute('class', 'card-body');
            

            let carddate =document.createElement("h6");
            let cardtemp =document.createElement("p");
            let cardhumid =document.createElement("p");
            let cardwind =document.createElement("p");
            let carduvi =document.createElement("p");
            let cardicon = document.createElement ("img")

            
            carddate.textContent = fdaydate;
            cardtemp.textContent = "Temp:" + fdaytemp +" F";
            cardhumid.textContent=   fdayhumid+" % Humidity ";
            cardwind.textContent = "Wind: " + fdaywind + "mph";
            carduvi.textContent = "UVindex:" + fdayuvi;
            cardicon.setAttribute('src', fdayiconurl)

            if(fdayuvi < 3){ carduvi.style.backgroundColor = "green" }
            else if ( fdayuvi > 3 && fdayuvi < 6){ carduvi.style.backgroundColor = "yellow" }
            else if ( fdayuvi > 6 && fdayuvi < 7){ carduvi.style.backgroundColor = "orange" }
            else{carduvi.style.backgroundColor = "red"}
            
            const fivedaycontainer = document.getElementById('fiveDay')
            cardtemplate.append(card); //create the box
            card.append(cardtext) //div up the box
            cardtext.append(carddate, cardtemp, cardhumid, cardwind, carduvi, cardicon) //put shit in the box
            fivedaycontainer.append(cardtemplate) //finished boxes added to html


            // I will make this work at a later date
            // ============================================
            // const fdaycard1 = document.querySelector('#card1')
            // const fdaycard2 = document.querySelector('#card2')
            // // console.log(fdaycard1)
            // const fdaytemplate = `
            // <div>
            // <h4 >${fdaydate}</h4>
            // <p >${fdaytemp}</p>
            // <p >${fdayhumid}</p>
            // <p >${fdaywind}</p>
            // </div>
            // `


        }


        })
        .catch(function (err) {
            console.error(err);
        });

}


//============================= get GeoCords=========================================
function getGeoCords(searchCity){
const requestUrl2 = (`https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&units=imperial&appid=${myKey}`)
longBit=''
latBit=''


fetch(requestUrl2)
.then(function (response) {
    console.log("getting geo-cords ");
    return response.json();
})
.then(function (response) {
    console.log(response);
    longBit= response.coord.lon
    latBit= response.coord.lat
    cName=response.name
    oneCallURL=`https://api.openweathermap.org/data/2.5/onecall?lat=${latBit}&lon=${longBit}&units=imperial&exclude=minutely,hourly&appid=${myKey}`
    getOnecallcurrent(oneCallURL)
    
})

}


// ===================search btn handler========================================
function handleSearchFormSubmit(e) {
    e.preventDefault();
    var search = searchInput.value.trim();
    getGeoCords(search)
    // getcurrentweather(search) 
    // getWeatherForcast (search)
};

searchbtn.addEventListener('click', handleSearchFormSubmit);






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
