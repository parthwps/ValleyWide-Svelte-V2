export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13'),
	() => import('./nodes/14'),
	() => import('./nodes/15'),
	() => import('./nodes/16'),
	() => import('./nodes/17'),
	() => import('./nodes/18'),
	() => import('./nodes/19')
];

export const server_loads = [0];

export const dictionary = {
		"/": [~6],
		"/about-us": [~7],
		"/articles": [~8,[2]],
		"/articles/[slug]": [~9,[2,3]],
		"/clear": [10],
		"/contact-us": [~11,[4]],
		"/our-process": [~12],
		"/our-team": [~13],
		"/our-team/[slug]": [~14],
		"/page": [15],
		"/portfolio": [~16],
		"/portfolio/[slug]": [~17],
		"/privacy": [~18,[5]],
		"/services": [~19]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};

export { default as root } from '../root.svelte';