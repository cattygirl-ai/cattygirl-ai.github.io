import React from "react";
import { CurrentWeather } from "./current-weather";

export interface ClothingProps {
    weather: CurrentWeather;
}

export interface ClothingState {
    weather: CurrentWeather;
}

export class ClothingRecommendation extends React.Component<
    ClothingProps,
    ClothingState
> {
    private RECOMMENDATION_MAP: Map<number[], string> = new Map([
        [
            [16, Number.POSITIVE_INFINITY],
            "Consider wearing: A half sleeved t-shirt or blouse paired with cropped bottoms such as shorts or a skirt, or opt for a dress instead",
        ],
        [
            [11, 15],
            "Consider wearing: A thick sweater, hoodie or full sleeved shirt with long bottoms(i.e. leggings, jeans or trousers)",
        ],
        [
            [1, 10],
            "Consider wearing: A light coat(i.e. a denim jacket, leather jacket) over a hoodie, t-shirt or dress and pair it with some long trousers, jeans or leggings",
        ],
        [
            [Number.NEGATIVE_INFINITY, 0],
            "Consider wearing: A heavy jacket(i.e. a winter coat, parka) over a thick hoodie/sweater or full sleeved shirt paired with winter boots and a hat and gloves",
        ],
    ]);

    constructor(props: ClothingProps) {
        super(props);
        this.state = {
            weather: props.weather,
        };
    }

    setWeather(weather: CurrentWeather): void {
        // anything else?
        this.setState({ weather });
    }

    getCurrentRecommendation(): string | undefined {
        const temp = this.state.weather.main.temp;
        for (let key of Array.from(this.RECOMMENDATION_MAP.keys())) {
            if (key[0] <= temp && temp <= key[1]) {
                return this.RECOMMENDATION_MAP.get(key);
            }
        }
        return undefined;
    }

    render() {
        return (
            <div className="clothing-recommendation">
                {this.getCurrentRecommendation()}
            </div>
        );
    }
}
