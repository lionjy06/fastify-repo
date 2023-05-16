import { FastifyRequest, FastifyReply } from 'fastify';
import AppError from '../lib/AppError';
export const getUserInfo = async (request: FastifyRequest, reply: FastifyReply) => {
  return request.user;
};
