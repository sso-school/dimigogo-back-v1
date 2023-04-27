const axios = require('axios');

module.exports = async (request, reply) => {
	const { q } = request.query;
	const res = await axios.get("https://search.map.kakao.com/mapsearch/map.daum", {
		params: {
			q: q,
			msFlag: "A",
			sort: "0",
		},
		headers: {
			Host: "search.map.kakao.com",
			Referer: "https://map.kakao.com/",
		},
	});
	return res.data;
}