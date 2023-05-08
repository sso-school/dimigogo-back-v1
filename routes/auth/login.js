// const axios = require('axios');

module.exports = async (request, reply) => {
	//fastify POST 
	const { username, password } = request.body;
	const token = this.jwt.sign({ ...request.body });
	
	return token;
}