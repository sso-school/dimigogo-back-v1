import * as controllers from './controllers.js';

const controller = [
	{
		name: '로그인',
		method: 'POST',
		url: '/login',
		handler: controllers.login
	},
];

export default async (fastify, opts) => {
	for(const _ of controller) {
		fastify[_.method.toLowerCase()](_.url, _.handler);
	}
}
