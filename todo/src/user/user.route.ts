import { FastifyPluginAsync, FastifyRequest } from 'fastify';
import {
  loginSchema,
  userSchema,
  registerSchema,
  refreshTokenSchema,
} from './user.schema';
import {
  getRefreshToken,
  loginHandler,
  refreshToken,
  registerHandler,
} from './user.controller';
import { createAppErrorSchema } from '../lib/AppError';
import useGuard from '../plugins/useGuard';

const userRouter: FastifyPluginAsync = async fastify => {
  fastify.get('/testme', () => {
    return 'it is me';
  });

  //특정 플러그인이 적용되었으면 하는 api가 있다면 wrapping을 한번더 해줘서 특정플러그인이 적용될 api와 아닌 api를 scope단계로 나눌수있다.
  fastify.register(async _fastify => {
    _fastify.register(useGuard);
    _fastify.get('/testyou', () => {
      return 'it is you';
    });
  });

  fastify.post(
    '/register',
    {
      schema: {
        body: registerSchema,
        response: {
          201: userSchema,
          409: createAppErrorSchema('AlreadyExists'),
        },
      },
    },
    registerHandler
  );
  fastify.post(
    '/login',
    {
      schema: {
        body: loginSchema,
        response: {
          201: userSchema,
          401: createAppErrorSchema('WrongCredentials'),
        },
      },
    },
    loginHandler
  );
  fastify.post<{ Body: { refreshToken?: string } }>(
    '/refresh',
    {
      schema: refreshTokenSchema,
    },
    refreshToken
  );
};

export default userRouter;
