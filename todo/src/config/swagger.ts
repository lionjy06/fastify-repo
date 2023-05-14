import { SwaggerOptions } from '@fastify/swagger';
import { FastifySwaggerUiOptions } from '@fastify/swagger-ui';

export const swaggerConfig: SwaggerOptions = {
  swagger: {
    info: {
      title: 'Test swagger',
      description: 'fastify repo swagger',
      version: '0.1.0',
    },
    externalDocs: {
      url: 'https://swagger.io',
      description: 'Find more info here',
    },
    host: 'localhost',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
      { name: 'user', description: 'User related end-points' },
      { name: 'code', description: 'Code related end-points' },
    ],
  },
};

export const swaggerUiConfig: FastifySwaggerUiOptions = {
  routePrefix: '/documentation',
  initOAuth: {},
  uiConfig: {
    // docExpansion: 'list',
    deepLinking: false,
  },
  uiHooks: {
    onRequest: function (request, reply, next) {
      next();
    },
    preHandler: function (request, reply, next) {
      next();
    },
  },
  staticCSP: true,
  transformStaticCSP: header => header,
};
