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

  public async execute(): Promise<Student[]> {
    const students = this.studentsRepository.findAllStudents();

    return students;
  }
}

export default CreateStudentService;
