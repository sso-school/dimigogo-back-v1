import path from 'path'
import AutoLoad from '@fastify/autoload'
import { fileURLToPath } from 'url'
import jwt from '@fastify/jwt'
import dotenv from 'dotenv'
import cookie from '@fastify/cookie'
import mongodb from '@fastify/mongodb'

dotenv.config();

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const options = {}
export default async function (fastify, opts) {
  fastify.register(mongodb, {
    forceClose: true,
    url: process.env.MONGO_URI,
  }, (err) => {
    if (err) throw err;
  })

  fastify.register(cookie)

  fastify.register(jwt, {
    secret: process.env.JWT_SECRET
  })
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })
}
