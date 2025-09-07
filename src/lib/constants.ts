import type { NavLink, Site } from "./types";

export const SITE: Site = {
	title: "Frontend Mentor | Weather app",
	description: "A Frontend Mentor challenge solution fro a weather app",
	href: "https://fem-weather-app.netlify.app/",
	author: "Thomas Jonstrup",
	locale: "en-US",
	repository: "https://github.com/thomasjonstrup/weather-app"
};

export const NAV_LINKS: NavLink[] = [
	{
		to: "/",
		label: "Home",
	},
];
