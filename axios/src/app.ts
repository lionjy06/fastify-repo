import fastify from 'fastify';
import axios from './lib/data-fetch';

const app = fastify();

(async () => {
  try {
    const response = await axios.delete('https://jsonplaceholder.typicode.com/posts/1');
    console.log(response);
  } catch (e) {
    console.error(e);
  }
})();

const start = async () => {
  try {
    await app.listen({ host: '0.0.0.0', port: 3000 });
  } catch (e) {
    app.log.error(e);
  }
};

start();

// {
//   method: 'GET',
//   url: 'https://jsonplaceholder.typicode.com/posts',
// body: JSON.stringify({
//   title: 'foo',
//   body: 'bar',
//   userId: 1,
// }),
//   headers: { 'Content-Type': 'application/json' },
// }
