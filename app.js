'use strict'

const path = require('path')
const AutoLoad = require('@fastify/autoload')
const jwt = require('@fastify/jwt')

require('dotenv').config()

// Pass --options via CLI arguments in command to enable these options.
module.exports.options = {}

module.exports = async function (fastify, opts) {
  fastify.register(jwt, {
    secret: process.env.JWT_SECRET,
  });
  
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })
}
