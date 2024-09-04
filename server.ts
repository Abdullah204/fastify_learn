import Fastify from 'fastify';
import FastifyPostgres from '@fastify/postgres';

const fastify = Fastify();

// Register Fastify-Postgres plugin
fastify.register(FastifyPostgres, {
  connectionString: 'postgres://postgres:postgres@localhost:5432/postgres'
});

interface Student {
  name: string;
  age: number;
  gender: 'M' | 'F';
}

fastify.post('/students', async (request, reply) => {
  const { name, age, gender }: Student = request.body as Student;
  const client = await fastify.pg.connect();
  try {
    const result = await client.query(
      'INSERT INTO student (name, age, gender) VALUES ($1, $2, $3) RETURNING *',
      [name, age, gender]
    );
    reply.send(result.rows[0]);
  } finally {
    client.release();
  }
});

fastify.get('/students', async (request, reply) => {
  const client = await fastify.pg.connect();
  try {
    const result = await client.query('SELECT * FROM student');
    reply.send(result.rows);
  } finally {
    client.release();
  }
});

fastify.get('/students/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const client = await fastify.pg.connect();
    try {
        const result = await client.query('SELECT * FROM student WHERE id = $1', [id]);
        reply.send(result.rows);
    } finally {
        client.release();
    }
  });

fastify.put('/students/:id', async (request, reply) => {
  const { id } = request.params as { id: string };
  const { name, age, gender }: Student = request.body as Student;
  const client = await fastify.pg.connect();
  try {
    const result = await client.query(
      'UPDATE student SET name = $1, age = $2, gender = $3 WHERE id = $4 RETURNING *',
      [name, age, gender, id]
    );
    reply.send(result.rows[0]);
  } finally {
    client.release();
  }
});

fastify.delete('/students/:id', async (request, reply) => {
  const { id } = request.params as { id: string };
  const client = await fastify.pg.connect();
  try {
    await client.query('DELETE FROM student WHERE id = $1', [id]);
    reply.code(204).send();
  } finally {
    client.release();
  }
});

// Start server
fastify.listen(3000, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
