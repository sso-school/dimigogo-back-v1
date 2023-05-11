// const axios = require('axios');
import axios from "axios";

export default async (request, reply) => {
	//fastify POST 
	const { kakaoAccesstoken } = request.body;
	const res = await axios.post(
		'https://kapi.kakao.com/v2/user/me', 
		{
			"secure_resource": true
		}, 
		{
			headers: {
				Authorization: `Bearer ${kakaoAccesstoken}`
			}
		}
	);

	const data = {
		id: res.data.id,
		nickname: res.data.properties.nickname,
		email: res.data.kakao_account.email,
		profile_image: res.data.properties.profile_image,
	};

	const accessToken = await reply.jwtSign(data, {
		expiresIn: '5min'
	});

	const refreshToken = await reply.jwtSign(data, {
		expiresIn: '20d'
	});

  const mongo = this.mongo.db.collection('auth')
	const result = await mongo.insertOne({
		...data,
		refreshToken: {
			token: refreshToken,
			expiresAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
		}
	})

	reply
	.code(200)
	.send({result})
}