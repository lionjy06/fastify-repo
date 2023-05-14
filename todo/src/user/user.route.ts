import { FastifyPluginAsync } from 'fastify';
import { loginSchema, registerResponseSchema, registerSchema } from './user.schema';
import { loginHandler, registerHandler } from './user.controller';
import AppError, { appErrorSchema } from '../lib/AppError';

const userRouter: FastifyPluginAsync = async fastify => {
  fastify.post(
    '/register',
    {
      schema: {
        body: registerSchema,
        response: {
          201: registerResponseSchema,
          409: {
            ...appErrorSchema,
            example: {
              name: 'UserExistsError',
              message: 'User Already Exist',
              statusCode: 409,
            },
          },
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
          201: registerResponseSchema,
          401: {
            ...appErrorSchema,
            example: {
              name: 'AuthenticationError',
              message: 'Invalid username of password',
              statusCode: 401,
            },
          },
        },
      },
    },
    loginHandler
  );
};

export default userRouter;
