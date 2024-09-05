import Fastify from 'fastify';
import FastifyPostgres from '@fastify/postgres';
import  registerRoutes from './routes';

const fastify = Fastify({ logger: true });

fastify.register(FastifyPostgres, {
  connectionString: 'postgres://postgres:postgres@localhost:5432/postgres'
});

registerRoutes(fastify);

fastify.listen(3000, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
