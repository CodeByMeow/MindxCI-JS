import * as api from './weather-api.js';

const hamburger = document.querySelector('#hamburger');
const overlay = document.querySelector('.overlay');


hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    overlay.classList.toggle('is-open');
});

const data = api.getWeather5Day();

data.then(item=> console.log(item));