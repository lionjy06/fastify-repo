import { FastifyPluginAsync } from 'fastify';
import { loginSchema, userSchema, registerSchema } from './user.schema';
import { loginHandler, registerHandler } from './user.controller';
import { createAppErrorSchema } from '../lib/AppError';

const userRouter: FastifyPluginAsync = async fastify => {
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
};

export default userRouter;
