import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindStudentsService from '@modules/students/services/FindStudentsService';

export default class StudentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { value } = request.query;

    const findStudents = container.resolve(FindStudentsService);

    const student = await findStudents.execute(String(value));

    return response.json(student);
  }
}
