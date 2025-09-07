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