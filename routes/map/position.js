import axios from 'axios';
import https from 'https';
import crypto from 'crypto';

export default async (request, reply) => {
	const { x, y } = request.query;
	const response = await axios.get(`https://map.kakao.com/link/map/PIN,${y},${x}`, {
		maxRedirects: 0,
		validateStatus: null,
		httpsAgent: new https.Agent({
			secureOptions: crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT,
		}),
	});
	const paramsObject = {};
	response.headers.location.split("?")[1].split("&").forEach(param => {
		const [name, value] = param.split("=");
		paramsObject[name] = value;
	});
	return {
		...paramsObject,
		url: response.headers.location,
	};
}