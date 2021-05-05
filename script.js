import * as api from "./weather-api.js";
import { images } from "./weather-images.js";

const ImageDir = "./src/weather-images";
const hamburger = document.querySelector("#hamburger");
const overlay = document.querySelector(".overlay");
const mainCotent = document.querySelector(".location");
const currentLocation = document.querySelector(".current-location");
const searchBtn = document.querySelector("#search-input");
const formSearch = document.querySelector(".location-form");
const currentLocationDesk = document.querySelector(".current-location-desk");
const searchBtnDesk = document.querySelector(".search-input");
const formSearchDesk = document.querySelector(".location-form-desk");

document.addEventListener('DOMContentLoaded', async () => {
    const html = await renderHTML();
    mainCotent.insertAdjacentHTML('beforeend', html);
});

hamburger.addEventListener("click", () => {
    searchBtn.value = '';
    hamburger.classList.toggle("open");
    overlay.classList.toggle("is-open");
});

currentLocation.addEventListener('click', async () => {
    searchBtn.value = `Ho Chi Minh`;
    await handingSubmit(searchBtn.value);
});


formSearch.addEventListener('submit', async (e) => {
    e.preventDefault();
    await handingSubmit(searchBtn.value);
});

formSearchDesk.addEventListener('submit', async (e) => {
    e.preventDefault();
    await handingSubmit(searchBtnDesk.value );
});

currentLocationDesk.addEventListener('click', async () => {
    searchBtnDesk.value = `Ho Chi Minh`;
    await handingSubmit(searchBtnDesk.value);
});

async function handingSubmit(location = 'Hồ Chí Minh') {
    api.setLocation(location);
    const html = await renderHTML();
    mainCotent.insertAdjacentHTML('beforeend', html);
    hamburger.classList.toggle("open");
    overlay.classList.toggle("is-open");
}

function getTypeWeatherImage(group_id) {
    if (group_id >= 200 && group_id < 300) {
        return `g2xx`;
    }

    if (group_id >= 300 && group_id < 500) {
        return `g3xx`;
    }

    if (group_id >= 500 && group_id < 600) {
        return `g5xx`;
    }

    if (group_id >= 600 && group_id < 700) {
        return `g6xx`;
    }

    if (group_id == 800) {
        return `g800`;
    }

    if (group_id > 800) {
        return `g80x`;
    }

    return -1;
}

function getImageSrc(key, source, pod) {
    const imageName = source[key][pod];
    return `${ImageDir}/${imageName}.png`;
}

function getDayByTime(time) {
    let d = new Date(time);
    const weekday = [
        "Chủ Nhật",
        "Thứ Hai",
        "Thứ Ba",
        "Thứ Tư",
        "Thứ Năm",
        "Thứ Sáu",
        "Thứ Bảy",
    ];
    return weekday[d.getDay()];
}

async function loadWeatherLocation() {
    const weatherInfo = await api.getSingleDayWeather();
    if (weatherInfo.cod >= 400) return weatherInfo.message;
    let result = [];
    result.push(weatherInfo[0]);
    for (let i = 1; i < weatherInfo.length; i++) {
        let days = {};
        let type;
        let image;
        type = getTypeWeatherImage(weatherInfo[i].weather[0].id);
        image = getImageSrc(type, images, weatherInfo[i].sys.pod);
        days["temp"] = roundTemp(weatherInfo[i].main.temp);
        days["feels_like"] = roundTemp(weatherInfo[i].main.feels_like);
        days["description"] = weatherInfo[i].weather[0].description;
        days["day_in_week"] = getDayByTime(weatherInfo[i].dt_txt);
        days["images"] = image;
        result.push(days);
    };
    return result;
}

function roundTemp(temp) {
    return Math.round(temp);
}

async function renderHTML() {
    const loader = await loadWeatherLocation();
    if (typeof loader == 'string') return loader;
    const [info, ...data ]= loader;
    const view = (await renderLocationView(info, data[0])).toString();
    const items = await renderLocationDays(data);
    const html = `<div class="location-view">${view}</div><div class="location-days">${items}</div>`;
    return html;
}

async function renderLocationView(weather_view, weather_info) {
    return `<div class="weather-text"/><h3>Vị trí hiện tại</h3>
                <h1>${weather_view.name}, ${weather_view.country}</h1>
                </div>
                <div class="weather-detail">
                    <div class="weather-image">
                        <img src="${weather_info.images}" alt="${weather_info.description}">
                    </div>
                    <div class="weather-info">
                        <h4>${weather_info.temp}&deg;C</h4>
                        <p>${weather_info.description}</p>
                        <p>Cảm giác như ${weather_info.feels_like}&deg;C</p>
                    </div>
                </div>`;
}

async function renderLocationDays(weatherInfo) {
    const html = [];
    weatherInfo.forEach(day => {
        html.push(`<div class="location-days-item"><h4>${day.day_in_week}</h4><img src="${day.images}" alt="${day.description}"><p>${day.temp} &deg;C</p></div>`);
    });

    return html.join('');
}