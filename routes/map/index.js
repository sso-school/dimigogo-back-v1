'use strict'

const controller = [
	{
		name: 'urlXY 가져오기',
		method: 'GET',
		url: '/position',
		handler: require('./position')
	},
	{
		name: '자동차 길찾기 정보 가져오기',
		method: 'GET',
		url: '/carinfo',
		handler: require('./carinfo')
	},
	{
		name: '장소 검색 결과 가져오기',
		method: 'GET',
		url: '/search',
		handler: require('./search')
	}
];

module.exports = async (fastify, opts) => {
	for(const _ of controller) {
		fastify[_.method.toLowerCase()](_.url, _.handler);
	}
}
