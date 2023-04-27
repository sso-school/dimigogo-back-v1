'use strict'

const axios = require('axios');
const https = require('https');
const crypto = require('crypto');

module.exports = async (fastify, opts) => {
	const controllers = ["position", "carinfo", "search"];
	for(const controller of controllers) {
		fastify.get(`/${controller}`, require(`./${controller}`));
	}
}
