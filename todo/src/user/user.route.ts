import { FastifyPluginAsync } from 'fastify';
import { registerSchema } from './user.schema';
import { registerHandler } from './user.controller';

const userRouter: FastifyPluginAsync = async fastify => {
  fastify.post(
    '/register',
    {
      schema: {
        body: registerSchema,
      },
    },
    registerHandler
  );
};

export default userRouter;
