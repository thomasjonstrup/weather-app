import type { LinkProps } from "@tanstack/react-router";

export type Site = {
	title: string;
	description: string;
	href: string;
	author: string;
	locale: string;
	repository?: string;
};

// You can use Pick to select only the props you need for your nav links:
export type NavLink = Pick<LinkProps, "to"> & {
	label: string;
};

export type SocialLink = {
	href: string;
	label: string;
	icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

/* Weather */

export type WeatherData = {
	current: {
		time: string; // ISO 8601 format
		interval: number; // in seconds
		temperature_2m: number; // in °C
		wind_speed_10m: number; // in km/h
	},
	hourly: {
		time: string[]; // Array of ISO 8601 formatted strings
		temperature_2m: number[]; // Array of temperatures in °C
		relative_humidity_2m: number[]; // Array of relative humidity percentages
		wind_speed_10m: number[]; // Array of wind speeds in km/h
	},
	current_units: {
		time: string; // e.g., "iso8601"
		interval: string; // e.g., "seconds"
		temperature_2m: string; // e.g., "°C"
		wind_speed_10m: string; // e.g., "km/h"
	},
	hourly_units: {
		time: string; // e.g., "iso8601"
		temperature_2m: string; // e.g., "°C"
		relative_humidity_2m: string; // e.g., "%"
		wind_speed_10m: string; // e.g., "km/h"
	},
	elevation: number; // in meters
	latitude: number; // in decimal degrees
	longitude: number; // in decimal degrees
	timezone: string; // e.g., "GMT"
	timezone_abbreviation: string; // e.g., "GMT"
	utc_offset_seconds: number; // in seconds
	generationtime_ms: number; // in milliseconds
}