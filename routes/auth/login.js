// const axios = require('axios');
import axios from "axios";
import { connectToDatabase } from "../../utils/db.js";

export default async (request, reply) => {
	//fastify POST 
	const { kakaoAccesstoken } = request.body;
	const res = await axios.get(
		'https://kapi.kakao.com/v2/user/me',
		{
			params: {
				secure_resource: true
			},
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
		expiresIn: '30min'
	});

	const refreshToken = await reply.jwtSign(data, {
		expiresIn: '20d'
	});

	const insert = {
		...data,
		refreshToken
	}

	try{
		const client = await connectToDatabase();
		const collection = client.db().collection("auth");

		const query = { id: data.id };
    const documents = await collection.find(query).toArray();
		
		if(documents.length) {
			await collection.updateOne(query, { $set: insert });
		} 
		else {
			await collection.insertOne(insert);
		}
		
		reply.code(200).send({
			accessToken,
			refreshToken
		});
	}
	catch{
		reply
		.code(500)
		.send({error: 'DB Error'})
	}
}