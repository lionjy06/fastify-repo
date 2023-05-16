import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import { getMeSchema } from './me.schema';
import { getUserInfo } from './me.controller';
import { createAppErrorSchema } from '../lib/AppError';
import useGuard from '../plugins/useGuard';

const meRouter: FastifyPluginAsync = async fastify => {
  //register를 해줘야 해당 경로에 있는 api들에 원하는 플러그인을 적용시킬수있다.
  fastify.register(useGuard);
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
