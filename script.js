const apiKey = '75a405cef73b0e9e5efdb211a798ac19';
const city = document.querySelector('.city-input');
const submitButton = document.querySelector('.submit-button');
const result = document.querySelector('.result');
const showData = document.querySelector('.current-forecast');
const futureData = document.querySelector('.future-forecast');
const bodyTransition = document.querySelector('.body-transition');
const cityName = document.querySelector('.city-name');
const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city.value}&appid=${apiKey}`;

let weather = '';

city.addEventListener('keypress', (e) =>{
  if (e.key === "Enter") {
    fetchCurrent();
    fetchFuture();
    cityName.innerText =  capitalizeFirstLetter(city.value);
    cityName.style.opacity = 1;
    city.value = '';
  }
  
})
submitButton.addEventListener('click',() =>{
  
  fetchCurrent();
  fetchFuture();
  cityName.innerText =  capitalizeFirstLetter(city.value);
  cityName.style.opacity = 1;
  city.value = '';
})

function fetchCurrent(){
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}`)
  .then(response => {
    if(!response.ok){
      throw new Error('Cant get response')
    };
    return response.json()
  })
  .then(data => {
    console.log(data);
    weather = data.weather[0].description;
      showData.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">
        <p>${data.weather[0].description}</p>
        <p>${(data.main.temp-273).toFixed(2)}°C</p>`;
        changeBackground(weather);
  })
  .catch(err => {console.log(err)
    futureData.innerHTML = `<p>Please enter correct place</p>`;
    showData.innerHTML = '';
  });
};

function fetchFuture(){
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city.value}&appid=${apiKey}`)
  .then(response => {
    if(!response.ok){
      throw new Error('Cant get response')
    };
    return response.json()
  })
  .then(data => {
      futureData.innerHTML = `<div>
        <img src="https://openweathermap.org/img/wn/${data.list[2].weather[0].icon}@2x.png" alt="">
        <p>${data.list[2].dt_txt.substring(11)}</p>
        <p>${(data.list[2].main.temp-273).toFixed(2)}°C</p>
      </div>
      <div>
        <img src="https://openweathermap.org/img/wn/${data.list[3].weather[0].icon}@2x.png" alt="">
        <p>${data.list[3].dt_txt.substring(11)}</p>
         <p>${(data.list[3].main.temp-273).toFixed(2)}°C</p>
      </div>
      <div>
        <img src="https://openweathermap.org/img/wn/${data.list[4].weather[0].icon}@2x.png" alt="">
        <p>${data.list[4].dt_txt.substring(11)}</p>
         <p>${(data.list[4].main.temp-273).toFixed(2)}°C</p>
      </div>
      <div>
        <img src="https://openweathermap.org/img/wn/${data.list[5].weather[0].icon}@2x.png" alt="">
        <p>${data.list[5].dt_txt.substring(11)}</p>
         <p>${(data.list[5].main.temp-273).toFixed(2)}°C</p>
      </div>
      <div>
        <img src="https://openweathermap.org/img/wn/${data.list[6].weather[0].icon}@2x.png" alt="">
        <p>${data.list[6].dt_txt.substring(11)}</p>
         <p>${(data.list[6].main.temp-273).toFixed(2)}°C</p>
      </div>`;
  })
  .catch(err => console.log(err));
};

function changeBackground(weather){
  if(weather == 'clear sky'){
    document.body.style.background = 'radial-gradient(white 10%, #0487e2 100%) no-repeat';
  } else if(weather == 'few clouds' || weather == 'scattered clouds' || weather == 'broken clouds'){
    document.body.style.background = 'radial-gradient(white 10%, gray 100%) no-repeat';
  } else if(weather == 'shower rain' || weather == 'rain' || weather == 'thunderstorm' || weather == 'moderate rain' || weather == 'overcast clouds'){
    document.body.style.background = 'radial-gradient(white 10%, rgb(82, 82, 82) 100%) no-repeat';
  } else if(weather == 'snow' || weather == 'mist'){
    document.body.style.background = 'radial-gradient(white 10%, #739BD0 100%) no-repeat';
  };
}

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}