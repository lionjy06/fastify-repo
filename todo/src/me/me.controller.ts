import { FastifyRequest, FastifyReply } from 'fastify';
import AppError from '../lib/AppError';
export const getUserInfo = async (request: FastifyRequest, reply: FastifyReply) => {
  if (request.isExpiredToken) {
    throw new AppError('UnAuthorizedError', {
      isExpiredToken: true,
    });
  }
  if (!request.user) {
    throw new AppError('UnAuthorizedError', {
      isExpiredToken: false,
    });
  }
};
