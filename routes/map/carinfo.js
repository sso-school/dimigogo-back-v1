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
		...response.data,
	};
}