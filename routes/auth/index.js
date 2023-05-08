'use strict'

const controller = [
	{
		name: '로그인',
		method: 'POST',
		url: '/login',
		handler: require('./login')
	},
];

module.exports = async (fastify, opts) => {
	for(const _ of controller) {
		fastify[_.method.toLowerCase()](_.url, _.handler);
	}
}
