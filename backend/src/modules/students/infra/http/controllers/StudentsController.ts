import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateStudentService from '@modules/students/services/CreateStudentService';
import UpdateStudentService from '@modules/students/services/UpdateStudentService';
import DeleteStudentService from '@modules/students/services/DeleteStudentService';
import ListStudentsService from '@modules/students/services/ListStudentsService';

export default class StudentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, ra, cpf, email } = request.body;

    const createStudent = container.resolve(CreateStudentService);

    const student = await createStudent.execute({
      name,
      ra,
      cpf,
      email,
    });

    return response.json(student);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { student_id, name, email } = request.body;

    const updateStudent = container.resolve(UpdateStudentService);

    const student = await updateStudent.execute({ student_id, name, email });

    return response.json(student);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { student_id } = request.params;

    const deleteStudent = container.resolve(DeleteStudentService);

    await deleteStudent.execute({ student_id });

    return response.status(200).json({ message: 'User deleted' });
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listStudents = container.resolve(ListStudentsService);

    const students = await listStudents.execute();

    return response.json(students);
  }
}
