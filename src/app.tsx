import React, { KeyboardEvent } from "react";
import { ClothingRecommendation } from "./clothing-recommendation";
import { CurrentWeather } from "./current-weather";
import { MOCK_WEATHER } from "./mocks/mock-weather";

const api = {
    key: "9651681a74f791de18e4098653e01dae",
    base: "https://api.openweathermap.org/data/2.5/",
};

interface AppState {
    query: string;
    weather: CurrentWeather;
}

class App extends React.Component<{}, AppState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            query: "",
            weather: MOCK_WEATHER, // rethink, maybe blank is better
        };
        this.search = this.search.bind(this);
        this.searchHandler = this.searchHandler.bind(this);
    }

    componentDidMount() {
        this.search("Toronto").then((result) => {
            this.setState({ weather: result });
        });
    }

    private searchHandler(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter") {
            this.search(this.state.query).then((result) => {
                this.setState({
                    query: "",
                    weather: result,
                });
                console.log(result);
            });
        }
    }

    private search(cityName: string): Promise<CurrentWeather> {
        return fetch(
            `${api.base}weather?q=${cityName}&units=metric&APPID=${api.key}`
        ).then((res) => res.json());
    }

    private constructDate(d: Date): string {
        let months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];
        let days = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day} ${date} ${month} ${year}`;
    }

    render() {
        return (
            <div
                className={
                    this.state.weather.main
                        ? this.state.weather.main.temp > 16
                            ? "app warm"
                            : "app"
                        : "app"
                }
            >
                <main>
                    <div className="search-box">
                        <input
                            type="text"
                            className="search-bar"
                            placeholder="Search..."
                            value={this.state.query}
                            onChange={(e) =>
                                this.setState({ query: e.target.value })
                            }
                            onKeyPress={this.searchHandler}
                        />
                    </div>
                    {typeof this.state.weather.main ? (
                        <div>
                            <div className="location-box">
                                <div className="location">
                                    {this.state.weather.name},{" "}
                                    {this.state.weather.sys.country}
                                </div>
                                <div className="date">
                                    {this.constructDate(new Date())}
                                </div>
                            </div>
                            <div className="weather-box">
                                <div className="temp">
                                    {Math.round(this.state.weather.main.temp)}°c
                                </div>
                                <div className="weather">
                                    {this.state.weather.weather[0].main}
                                </div>
                            </div>

                            <ClothingRecommendation weather={this.state.weather} />
                        </div>
                    ) : (
                        ""
                    )}
                </main>
            </div>
        );
    }
}
export default App;
