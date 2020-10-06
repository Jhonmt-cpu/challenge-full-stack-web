import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateStudentService from '@modules/students/services/CreateStudentService';

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
}
