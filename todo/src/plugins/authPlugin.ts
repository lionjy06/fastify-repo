import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import { AccessTokenPayload, validateToken } from '../lib/tokens';
import jwt from 'jsonwebtoken';
import AppError from '../lib/AppError';

const { JsonWebTokenError } = jwt;

export const authPluginAsync: FastifyPluginAsync = async fastify => {
  fastify.decorateRequest('isExpiredToken', false);
  fastify.decorateRequest('user', null);
  fastify.addHook('preHandler', async request => {
    const { authorization } = request.headers;
    // console.log(authorization);
    if (!authorization || !authorization?.includes('Bearer')) {
      return;
    }

    const token = authorization?.split('Bearer ')[1];

    try {
      const decoded = await validateToken<AccessTokenPayload>(token);
      request.user = {
        email: decoded.email,
        nickname: decoded.nickname,
      };
    } catch (e: any) {
      if (e instanceof JsonWebTokenError) {
        if (e.name === 'TokenExpiredError') {
          request.isExpiredToken = true;
        }
      }
      console.log(e.name, e.message);
    }
    //요청객체안에 넣어주는 방법
    // request.user = {
    //   email: 'test@test',
    //   nickname: 'test',
    // };
    console.log('hello world');
  });
};

export const authPlugin = fp(authPluginAsync, {
  name: 'authPlugin',
});

declare module 'fastify' {
  interface FastifyRequest {
    user: {
      email: string;
      nickname: string;
    } | null;
    isExpiredToken: boolean;
  }
}
