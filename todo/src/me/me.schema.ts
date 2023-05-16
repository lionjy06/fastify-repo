import { FastifySchema } from 'fastify';
import { userSchema } from '../user/user.schema';
import { createAppErrorSchema } from '../lib/AppError';
import { Type } from '@sinclair/typebox';

const UnauthorizedErrorSchema = createAppErrorSchema(
  'Unauthorized',
  {
    isExpiredToken: true,
  },
  Type.Object({
    isExpiredToken: Type.Boolean(),
  })
);

export const getMeSchema: FastifySchema = {
  response: {
    200: userSchema,
    401: UnauthorizedErrorSchema,
  },
};
