import { inject, injectable } from 'tsyringe';

// import AppError from '@shared/errors/AppError';

import IStudentsRespository from '../repositories/IStudentsRepository';

import Student from '../infra/typeorm/entities/Student';

@injectable()
class CreateStudentService {
  constructor(
    @inject('StudentsRepository')
    private studentsRepository: IStudentsRespository,
  ) {}

  public async execute(value: string): Promise<Student[]> {
    let raNumber = Number(value);

    if (isNaN(raNumber)) {
      raNumber = 0;
    }

    const students = this.studentsRepository.findStudents({
      name: value,
      email: value,
      ra: raNumber,
      cpf: value,
    });

    return students;
  }
}

export default CreateStudentService;
