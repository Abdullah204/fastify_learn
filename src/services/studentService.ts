import { FastifyInstance } from 'fastify';
import Student from '../models/student';

export class StudentService {
  private fastify: FastifyInstance;

  constructor(fastify: FastifyInstance) {
    this.fastify = fastify;
  }

  async createStudent(student: Student) {
    const client = await this.fastify.pg.connect();
    try {
      const result = await client.query(
        'INSERT INTO student (name, age, gender) VALUES ($1, $2, $3) RETURNING *',
        [student.name, student.age, student.gender]
      );
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  async getStudentById(id: number) {
    const client = await this.fastify.pg.connect();
    try {
      const result = await client.query('SELECT * FROM student WHERE id = $1', [id]);
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  async getAllStudents() {
    const client = await this.fastify.pg.connect();
    try {
      const result = await client.query('SELECT * FROM student');
      return result.rows;
    } finally {
      client.release();
    }
  }

  async updateStudent(id: number, student: Student) {
    const client = await this.fastify.pg.connect();
    try {
      const result = await client.query(
        'UPDATE student SET name = $1, age = $2, gender = $3 WHERE id = $4 RETURNING *',
        [student.name, student.age, student.gender, id]
      );
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  async deleteStudent(id: number) {
    const client = await this.fastify.pg.connect();
    try {
      const result = await client.query('DELETE FROM student WHERE id = $1 RETURNING *', [id]);
      return result.rows[0];
    } finally {
      client.release();
    }
  }
}
