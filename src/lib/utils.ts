import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { WeatherData } from "./types";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}


export function formatDate(dateString: string): string {
	const date = new Date(dateString);
	const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric' };
	return date.toLocaleDateString(undefined, options);
}

export function groupHourlyByDate(data: WeatherData) {
	if (!data || !data.hourly || !data.hourly.time) return {};
	const grouped: { [date: string]: {time: string, temperature: number, temperatureUnit: string}[] } = {};
	data.hourly.time.forEach((time: string, index: number) => {
		const date = new Date(time).toISOString().split('T')[0];
		if (!grouped[date]) {
			grouped[date] = [];
		}
		console.log('date', date)
		grouped[date].push({
			time,
			temperature: data.hourly.temperature_2m[index],
			temperatureUnit: data.hourly_units.temperature_2m,
/* 			weathercode: data.hourly.weathercode[index],
			windSpeed: data.hourly.windspeed_10m[index],
			windSpeedUnit: data.hourly_units.windspeed_10m,
			humidity: data.hourly.relativehumidity_2m[index],
			humidityUnit: data.hourly_units.relativehumidity_2m,
			precipitation: data.hourly.precipitation[index],
			precipitationUnit: data.hourly_units.precipitation, */
		});
	}	);
	return grouped;
}