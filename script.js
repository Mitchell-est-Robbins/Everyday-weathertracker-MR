// console.log("winning")


const myKey = "cb15120a874ba7b3d3c9ff343bd7f119"
// const urlPrim = (`https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${myKey}`)
// const urlSnd =  (`https://api.openweathermap.org/data/2.5/forecast?q=${searchInput}&appid=${myKey}`)
// const apiRoot = (`https://api.openweathermap.org`)




const searchInput = document.querySelector('#locationInputtext')
const searchbtn= document.querySelector('#searchButton')


//make a call to the api with the search button info
//template taken from inclass 10===================
function getcurrentweather(searchCity) {
   
    
    const requestUrl = (`https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${myKey}`)
    

    fetch(requestUrl)
        .then(function (response) {
            console.log(requestUrl, "URL in use")
            return response.json();
        })
        // .then(function (data) {
        //     //Using console.log to examine the data
        //     console.log(data);
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


function handleSearchFormSubmit(e) {
    e.preventDefault();
    var search = searchInput.value.trim();
    getcurrentweather(search) 
};

searchbtn.addEventListener('click', handleSearchFormSubmit);


// GIVEN a weather dashboard with form inputs

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
