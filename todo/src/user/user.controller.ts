import { FastifyReply, FastifyRequest } from 'fastify';
import { registerUser } from './user.service';

export const registerHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const userInfo = request.body;
    const result = await registerUser(userInfo);
    reply.code(200).send(result);
  } catch (e) {
    console.error(e);
    throw e;
  }
};
