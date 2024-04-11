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
	() => import('./nodes/19'),
	() => import('./nodes/20'),
	() => import('./nodes/21'),
	() => import('./nodes/22'),
	() => import('./nodes/23')
];

export const server_loads = [0];

export const dictionary = {
		"/": [~6],
		"/about-us": [~7],
		"/articles": [~8,[2]],
		"/articles/[slug]": [~9,[2,3]],
		"/clear": [10],
		"/contact-us": [~11,[4]],
		"/home_old": [~12],
		"/our-process": [~13],
		"/our-team": [~14],
		"/our-team/[slug]": [~15],
		"/page2": [17],
		"/page3": [18],
		"/page4": [19],
		"/page": [16],
		"/portfolio": [~20],
		"/portfolio/[slug]": [~21],
		"/privacy": [~22,[5]],
		"/services": [~23]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};

export { default as root } from '../root.svelte';