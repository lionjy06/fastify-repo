import fastify from 'fastify';
import userRouter from './user/user.route';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import AppError from './lib/AppError';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { swaggerConfig, swaggerUiConfig } from './config/swagger';
import dotenv from 'dotenv';

dotenv.config();

const app = fastify({
  logger: true,
}).withTypeProvider<TypeBoxTypeProvider>();
app.register(swagger, swaggerConfig);
app.register(swaggerUi, swaggerUiConfig);
app.register(userRouter);
app.setErrorHandler(async (err, request, reply) => {
  reply.statusCode = err.statusCode ?? 500;

  if (err instanceof AppError) {
    return reply.send({
      name: err.name,
      message: err.message,
      statusCode: err.statusCode,
    });
  }
  return err;
});
const main = async () => {
  try {
    await app.listen({ host: '0.0.0.0', port: 3000 });
  } catch (e) {
    app.log.error(e);
  }
};

main();

export default app;
