import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import AppError from '../lib/AppError';

const userGuardAsync: FastifyPluginAsync = async fastify => {
  fastify.addHook('preHandler', async (request, reply) => {
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
  });
};

const useGuard = fp(userGuardAsync, {
  name: 'useGuard',
});

export default useGuard;
