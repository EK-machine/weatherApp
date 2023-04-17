#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { printError, printSuccess, printHelp, printWeather } from './services/log.service.js';
import { saveKeyValue, getKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js';
import { getWeather } from './services/api.service.js';

const saveToken = async (token) => {
    if (!token.length) {
        printError('Token hasn\'t been passed');
        return
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token);
        printSuccess('Token saved');
    } catch (e) {
        printError(e.message);
    }
};

const saveCity = async(city) => {
    if (!city.length) {
        printError('City has\'nt been passed');
        return
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.city, city);
        printSuccess('City saved');
    } catch (e) {
        printError(e.message);
    }

};

const getForecast = async() => {
    try {
        const city = process.env.city ?? await getKeyValue(TOKEN_DICTIONARY.city)
        const weather = await getWeather(city);
        printWeather(weather);
    } catch (e) {
        if (e?.response?.status === 404) {
            printError('The city is set incorrectly');
        } else if (e?.response?.status === 401) {
            printError('The token is set incorrectly');
        } else {
            printError(e.message);
        }
    }
};

const initCLI = () => {
    const args = getArgs(process.argv);
    if (args.h) {
        return printHelp();
    }
    if (args.s) {
        return saveCity(args.s);
    }
    if (args.t) {
        return saveToken(args.t);
    }
    return getForecast();
};

initCLI();