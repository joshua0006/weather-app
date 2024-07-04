const apiKey = '75a405cef73b0e9e5efdb211a798ac19';
const city = document.querySelector('.city-input');
const submitButton = document.querySelector('.submit-button');
const result = document.querySelector('.result');
const showData = document.querySelector('.current-forecast');
const futureData = document.querySelector('.future-forecast');
const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city.value}&appid=${apiKey}`;


submitButton.addEventListener('click',() =>{

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}`)
  .then(response => {
    if(!response.ok){
      throw new Error('Cant get response')
    };
    return response.json()
  })
  .then(data => {
    console.log(data);
      showData.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">
        <p>${data.weather[0].description}</p>
        <p>${(data.main.temp-273).toFixed(2)}°C</p>`;
  })
  .catch(err => console.log(err));

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

  city.value ='';
})

