import { FastifyRequest, FastifyReply } from 'fastify';
import AppError from '../lib/AppError';
export const getUserInfo = async (request: FastifyRequest, reply: FastifyReply) => {
  console.log(request.isExpiredToken);
  console.log(request.user);
  if (request.isExpiredToken) {
    throw new AppError('Unauthorized', {
      isExpiredToken: true,
    });
  }
  if (!request.user) {
    throw new AppError('Unauthorized', {
      isExpiredToken: false,
    });
  }

  return request.user;
};
