import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IStudentsRespository from '../repositories/IStudentsRepository';

import Student from '../infra/typeorm/entities/Student';

interface IRequest {
  name: string;
  email: string;
  ra: number;
  cpf: string;
}

@injectable()
class CreateStudentService {
  constructor(
    @inject('StudentsRepository')
    private studentsRepository: IStudentsRespository,
  ) {}

  public async execute({ name, cpf, ra, email }: IRequest): Promise<Student> {
    const checkStudentExists = await this.studentsRepository.findByRAOrCPFOrEmail(
      {
        ra,
        email,
        cpf,
      },
    );

    if (checkStudentExists) {
      throw new AppError('RA or CPF alredy registered');
    }

    const student = await this.studentsRepository.create({
      name,
      email,
      ra,
      cpf,
    });

    return student;
  }
}

export default CreateStudentService;
