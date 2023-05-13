import axios from "axios";
import { connectToDatabase } from "../../utils/db.js";

export default async (request, reply) => {
	// const { accessToken, refreshToken } = request.body;

	// const accessToken = await reply.jwtSign(data, {
	// 	expiresIn: '5min'
	// });

	// const refreshToken = await reply.jwtSign(data, {
	// 	expiresIn: '20d'
	// });

	// const insert = {
	// 	...data,
	// 	refreshToken
	// }
	
	//accessToken 증명
	
	// try {
  //   await request.jwtVerify()
  // } catch (err) {
  //   reply.send(err)
  // }

	await axios.get("https://example.com");
	reply.send("ok");
}