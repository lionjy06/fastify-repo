import { FastifyPluginAsync } from 'fastify';
import { postTodoSchema, reponsePostSchema } from './todo.schema';

import { Type } from '@sinclair/typebox';
import { postTodoHandler } from './todo.controller';

const todoRouter: FastifyPluginAsync = async fastify => {
  fastify.post(
    '/post',
    {
      schema: {
        body: postTodoSchema,
        response: {
          200: reponsePostSchema,
        },
      },
    },
    postTodoHandler
  );
};

export default todoRouter;
