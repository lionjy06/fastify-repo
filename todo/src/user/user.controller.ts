import { FastifyReply, FastifyRequest } from 'fastify';
import { getRefreshToken, loginUser, registerUser } from './user.service';
import { LoginInput, RegisterDto } from './user.schema';
import AppError from '../lib/AppError';

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

  setTokenCookie(reply, user.token);

  return user;
};

export const refreshToken = async (request: FastifyRequest, reply: FastifyReply) => {
  const refreshToken = request.body?.refreshToken || request.cookies.refreshToken || '';

  if (!refreshToken) {
    throw new AppError('BadRequest');
  }

  const result = await getRefreshToken(refreshToken);
  setTokenCookie(reply, result);
  return result;
};

const setTokenCookie = (
  reply: FastifyReply,
  tokens: { access_Token: string; refresh_Token: string }
) => {
  console.log(tokens);
  reply.setCookie('accessToken', tokens.access_Token, {
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60 * 60),
    path: '/',
  });
  reply.setCookie('refreshToken', tokens.refresh_Token, {
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    path: '/',
  });
};
