import { FastifyPluginAsync } from 'fastify';
import { registerResponseSchema, registerSchema } from './user.schema';
import { registerHandler } from './user.controller';
import { appErrorSchema } from '../lib/AppError';

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
};

export default userRouter;
