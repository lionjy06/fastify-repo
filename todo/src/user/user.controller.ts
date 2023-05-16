import { FastifyReply, FastifyRequest } from 'fastify';
import { loginUser, registerUser } from './user.service';
import { LoginInput, RegisterDto } from './user.schema';

export const registerHandler = async (
  request: FastifyRequest<{ Body: RegisterDto }>,
  reply: FastifyReply
) => {
  try {
    const userInfo = request.body;

    const result = await registerUser(userInfo);
    reply.code(200).send(result);
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const loginHandler = async (
  request: FastifyRequest<{ Body: LoginInput }>,
  reply: FastifyReply
) => {
  const user = await loginUser(request.body);
  return user;
};
