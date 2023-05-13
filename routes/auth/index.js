import * as controllers from './controllers.js';

const controller = [
	{
		name: '카카오 로그인',
		method: 'POST',
		url: '/login',
		handler: controllers.login,
	},
	{
		name: '토큰 확인',
		method: 'POST',
		url: '/check',
		handler: controllers.check,
		auth: true
	}
];

export default async (fastify, opts) => {
	for(const _ of controller) {
		fastify[_.method.toLowerCase()](_.url, async (request, reply) => {
			if(_.auth) {
				try {
					await request.jwtVerify();
				} catch (err) {
					reply.send(err);
				}
			}
			await _.handler(request, reply);
		});
	}
}
