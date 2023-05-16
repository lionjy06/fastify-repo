import fastify, { FastifyPluginAsync } from 'fastify';
import userRouter from './user/user.route';
import meRouter from './me/me.router';

const api: FastifyPluginAsync = async fastify => {
  fastify.register(userRouter, { prefix: '/auth' });
  fastify.register(meRouter, { prefix: '/me' });
};
export default api;
