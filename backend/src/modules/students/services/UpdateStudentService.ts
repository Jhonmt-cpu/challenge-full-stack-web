import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IStudentsRespository from '../repositories/IStudentsRepository';

import Student from '../infra/typeorm/entities/Student';

interface IRequest {
  student_id: string;
  name: string;
  email: string;
}

@injectable()
class UpdateStudentService {
  constructor(
    @inject('StudentsRepository')
    private studentsRepository: IStudentsRespository,
  ) {}

  public async execute({
    student_id,
    name,
    email,
  }: IRequest): Promise<Student> {
    const student = await this.studentsRepository.findById(student_id);

    if (!student) {
      throw new AppError('Student not found');
    }

    const userWithUpdatedEmail = await this.studentsRepository.findByEmail(
      email,
    );

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== student_id) {
      throw new AppError('Email already in use');
    }

    student.name = name;
    student.email = email;

    return this.studentsRepository.save(student);
  }
}

export default UpdateStudentService;
