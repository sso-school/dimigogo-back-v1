import axios from "axios";
import { connectToDatabase } from "../../utils/db.js";

export default async (request, reply) => {
	const { refreshToken } = request.body;
	try{
		const client = await connectToDatabase();
		const collection = client.db().collection("auth");
		const query = { refreshToken };
		const documents = (await collection.find(query).toArray())[0];

		if(!documents) {
			reply
			.code(500)
			.send({error: 'DB Error'})
			return;
		}

		if(documents.refreshTokenExp < new Date()) {
			reply
			.code(401)
			.send({
				statusCode: 401,
				error: "Unauthorized",
				message: 'Refresh Token Expired'
			})
			return;
		}

		const data = {
			id: documents.id,
			nickname: documents.nickname,
			email: documents.email,
			profile_image: documents.profile_image,
		}

		const newAccessToken = await reply.jwtSign(data, {
			expiresIn: '5min'
		});

		const newRefreshToken = await reply.jwtSign(data, {
			expiresIn: '20d'
		});

		await collection.updateOne(query, { $set: {
			...data,
			refreshToken: newRefreshToken,
			refreshTokenExp: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000)
		} });

		reply.send({accessToken: newAccessToken, refreshToken: newRefreshToken});
	}
	catch{
		reply
		.code(500)
		.send({error: 'DB Error'})
	}
	// await axios.get("https://example.com");
}