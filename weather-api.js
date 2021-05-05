const API_KEY = '20674d4b95785cef708f4f6732bb0ac3';
const base_url = 'https://api.openweathermap.org/data/2.5/forecast';
const params = {
    q: 'Ho Chi Minh City',
    appid: API_KEY,
    units: 'metric',
    lang: 'vi',
}

function createApiUrl(base_url, params) {
    return `${base_url}?q=${params.q}&appid=${params.appid}&units=${params.units}&lang=${params.lang}`;
}

function setLocation(location) {
    return params.q =location;
}

async function getWeather5Day() {
    const apiUrl = createApiUrl(base_url, params);
    return await (await (fetch(apiUrl))).json();
}

export {getWeather5Day, setLocation}