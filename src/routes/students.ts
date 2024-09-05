import { FastifyInstance } from 'fastify';
import { 
  createStudentController,
  getAllStudentsController,
  getStudentByIdController,
  updateStudentController,
  deleteStudentController 
} from '../controllers/studentController';

export default async function studentRoutes(fastify: FastifyInstance) {

  fastify.post('/students', createStudentController);

  fastify.get('/students', getAllStudentsController);

  fastify.get('/students/:id', getStudentByIdController);
  
  fastify.put('/students/:id', updateStudentController);

  fastify.delete('/students/:id', deleteStudentController);
}
