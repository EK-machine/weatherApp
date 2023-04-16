import { getKeyValue, TOKEN_DICTIONARY } from './storage.service.js';
import axios from 'axios';


const getWeather = async(city) => {
    const token = process.env.TOKEN ?? await getKeyValue(TOKEN_DICTIONARY.token);
    if (!token) {
        throw new Error('No api key is given please set it via command -t [API_KEY');
    }
    const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
            q: city,
            appid: token,
            lang: 'ru',
            units: 'metric'
        }
    });
    console.log(data);
    return data;
};

export { getWeather };