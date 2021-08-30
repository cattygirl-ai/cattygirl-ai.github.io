import { CurrentWeather } from "../current-weather";

export const MOCK_WEATHER: CurrentWeather = {
    coord: {
        lon: -79.4163,
        lat: 43.7001,
    },
    weather: [
        {
            id: 801,
            main: "Clouds",
            description: "few clouds",
            icon: "02n",
        },
    ],
    base: "stations",
    main: {
        temp: 40,
        feels_like: 29.79,
        temp_min: 22.54,
        temp_max: 29.06,
        pressure: 1012,
        humidity: 74,
    },
    visibility: 10000,
    wind: {
        speed: 2.24,
        deg: 225,
        gust: 7.15,
    },
    clouds: {
        all: 20,
    },
    dt: 1630283513,
    sys: {
        type: 1,
        id: 718,
        country: "CA",
        sunrise: 1630233502,
        sunset: 1630281546,
    },
    timezone: -14400,
    id: 6167865,
    name: "Toronto",
    cod: 200,
};
