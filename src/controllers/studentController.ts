import { FastifyRequest, FastifyReply } from 'fastify';
import { StudentService } from '../services/studentService';
import Student from '../models/student';

// Create a new student
export async function createStudentController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { name, age, gender }: Student = request.body as Student;
  const studentService = new StudentService(request.server);

  try {
    const newStudent = await studentService.createStudent({ name, age, gender });
    reply.code(201).send(newStudent);
  } catch (error: any) {
    request.server.log.error(error);
    reply.code(500).send({ error: 'Could not create student', details: error.message });
  }
}

// Get all students
export async function getAllStudentsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const studentService = new StudentService(request.server);

  try {
    const students = await studentService.getAllStudents();
    reply.code(200).send(students);
  } catch (error: any) {
    request.server.log.error(error);
    reply.code(500).send({ error: 'Could not fetch students', details: error.message });
  }
}

// Get a student by ID
export async function getStudentByIdController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = request.params as { id: string };
  const studentService = new StudentService(request.server);

  try {
    const student = await studentService.getStudentById(Number(id));
    if (!student) {
      reply.code(404).send({ error: 'Student not found' });
    } else {
      reply.code(200).send(student);
    }
  } catch (error: any) {
    request.server.log.error(error);
    reply.code(500).send({ error: 'Could not fetch student', details: error.message });
  }
}

// Update a student by ID
export async function updateStudentController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = request.params as { id: string };
  const { name, age, gender }: Student = request.body as Student;
  const studentService = new StudentService(request.server);

  try {
    const updatedStudent = await studentService.updateStudent(Number(id), { name, age, gender });
    if (!updatedStudent) {
      reply.code(404).send({ error: 'Student not found' });
    } else {
      reply.code(200).send(updatedStudent);
    }
  } catch (error: any) {
    request.server.log.error(error);
    reply.code(500).send({ error: 'Could not update student', details: error.message });
  }
}

// Delete a student by ID
export async function deleteStudentController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = request.params as { id: string };
  const studentService = new StudentService(request.server);

  try {
    const deletedStudent = await studentService.deleteStudent(Number(id));
    if (!deletedStudent) {
      reply.code(404).send({ error: 'Student not found' });
    } else {
      reply.code(200).send(deletedStudent);
    }
  } catch (error: any) {
    request.server.log.error(error);
    reply.code(500).send({ error: 'Could not delete student', details: error.message });
  }
}
