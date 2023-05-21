import fastify from 'fastify';
import api from './indexRouter';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import AppError from './lib/AppError';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { swaggerConfig, swaggerUiConfig } from './config/swagger';
import dotenv from 'dotenv';
import { authPluginAsync } from './plugins/authPlugin';
import fastifyCookie from '@fastify/cookie';
dotenv.config();

const app = fastify({
  logger: true,
}).withTypeProvider<TypeBoxTypeProvider>();
app.register(authPluginAsync);
app.register(swagger, swaggerConfig);
app.register(swaggerUi, swaggerUiConfig);
app.register(fastifyCookie);
app.register(api);
app.setErrorHandler(async (err, request, reply) => {
  reply.statusCode = err.statusCode ?? 500;

  if (err instanceof AppError) {
    return reply.send({
      name: err.name,
      message: err.message,
      statusCode: err.statusCode,
      payload: err.payload,
    });
  }
  return err;
});
const main = async () => {
  try {
    await app.listen({ host: '0.0.0.0', port: 4000 });
  } catch (e) {
    app.log.error(e);
  }
};

main();

export default app;
