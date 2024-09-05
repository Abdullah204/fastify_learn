import Fastify, { FastifyInstance } from 'fastify';
import FastifyPostgres from '@fastify/postgres';
import studentRoutes from './students';

const fastify = Fastify();

fastify.register(FastifyPostgres, {
  connectionString: 'postgres://postgres:password@localhost:5432/postgres',
});

export default async function registerRoutes(fastify: FastifyInstance) {
    await fastify.register(studentRoutes);
}

