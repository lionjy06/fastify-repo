import fastify from 'fastify';
import userRouter from './user/user.route';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';

const app = fastify({
  logger: true,
}).withTypeProvider<TypeBoxTypeProvider>();

app.register(userRouter);

const main = async () => {
  try {
    await app.listen({ host: '0.0.0.0', port: 3000 });
  } catch (e) {
    app.log.error(e);
  }
};

main();

export default app;
