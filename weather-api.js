const API_KEY = '20674d4b95785cef708f4f6732bb0ac3';
const base_url = 'https://api.openweathermap.org/data/2.5/forecast';
const params = {
    q: 'Ha noi',
    appid: API_KEY,
    units: 'metric',
    lang: 'vi',
}

function createApiUrl(base_url, params) {
    return `${base_url}?q=${params.q}&appid=${params.appid}&units=${params.units}&lang=${params.lang}`;
}

function setLocation(location = 'Ho Chi Minh') {
    return params.q =location;
}

function getLocation() {
    return params.q;
}

async function getWeather5Day() {
    const apiUrl = createApiUrl(base_url, params);
    return await (await fetch(apiUrl)).json();
}

async function getSingleDayWeather() {
    const data = [];
    const weather = await getWeather5Day();
    if (weather.cod >= 400) return weather;
    data.push(weather.city);
    const days = weather.list;
    for ( let i = 0; i < days.length; i+=8 ) {
        data.push(days[i]);
    }
    return data;
}

export {getSingleDayWeather, setLocation, getLocation}