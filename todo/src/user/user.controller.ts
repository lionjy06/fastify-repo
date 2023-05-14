import { FastifyReply, FastifyRequest } from 'fastify';
import { registerUser } from './user.service';
import { RegisterDto } from './user.schema';
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
