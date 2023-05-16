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
          200: getMeSchema,
          401: createAppErrorSchema('Unauthorized'),
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      return await getUserInfo(request, reply);
    }
  );
};

export default meRouter;
