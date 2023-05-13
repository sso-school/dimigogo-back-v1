import * as controllers from './controllers.js';

const controller = [
	{
		name: 'urlXY 가져오기',
		method: 'GET',
		url: '/position',
		handler: controllers.position,
		auth: true
	},
	{
		name: '자동차 길찾기 정보 가져오기',
		method: 'GET',
		url: '/carinfo',
		handler: controllers.carinfo,
		auth: true
	},
	{
		name: '장소 검색 결과 가져오기',
		method: 'GET',
		url: '/search',
		handler: controllers.search,
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