import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import { getMeSchema } from './me.schema';
import { getUserInfo } from './me.controller';
import { createAppErrorSchema } from '../lib/AppError';

const meRouter: FastifyPluginAsync = async fastify => {
  fastify.get(
    '/',
    {
      schema: {
        response: {
          200: {
            type: 'object',
            properties: {
              email: { type: 'string' },
              nickname: { type: 'string' },
            },
          },
          401: createAppErrorSchema('Unauthorized'),
        },
      },
    },
    getUserInfo
  );
};

export default meRouter;
