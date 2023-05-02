const axios = require('axios');
const https = require('https');
const crypto = require('crypto');

module.exports = async (request, reply) => {
	const { x1: urlX1, y1: urlY1, x2: urlX2, y2: urlY2 } = request.query;
	const response = await axios.get(`https://map.kakao.com/route/carset.json?roadside=ON&sp=${urlX1},${urlY1},start,POINT,&ep=${urlX2},${urlY2},end,POINT,&carMode=SHORTEST_REALTIME&carOption=NONE`, {
		httpsAgent: new https.Agent({
			secureOptions: crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT,
		}),
	});
	return {
		url: `https://map.kakao.com/?map_type=TYPE_MAP&target=car&rt=${urlX1},${urlY1},${urlX2},${urlY2}&rt1=출발지&rt2=도착지`,
		iOSUrl: `kakaomap://route?sp=${urlX1},${urlY1}&sn=출발지&ep=${urlX2},${urlY2}&en=도착지&by=car&referrer=m.map.kakao.com`,
		androidUrl: `intent://route?sp=${urlX1},${urlY1}&sn=출발지&ep=${urlX2},${urlY2}&en=도착지&by=car&referrer=m.map.kakao.com#Intent;scheme=daummaps;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;package=net.daum.android.map;end`,
		iOSStore: 'http://itunes.apple.com/kr/app/id304608425',
		androidStore: 'https://play.google.com/store/apps/details?id=net.daum.android.map',
		...response.data,
	};
}