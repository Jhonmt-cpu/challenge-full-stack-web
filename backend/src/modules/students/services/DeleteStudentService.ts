import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IStudentsRespository from '../repositories/IStudentsRepository';

interface IRequest {
  student_id: string;
}

@injectable()
class UpdateStudentService {
  constructor(
    @inject('StudentsRepository')
    private studentsRepository: IStudentsRespository,
  ) {}

  public async execute({ student_id }: IRequest): Promise<void> {
    const student = await this.studentsRepository.findById(student_id);

    if (!student) {
      throw new AppError('Student not found');
    }

    const successfullDelete = await this.studentsRepository.delete(student_id);

    if (!successfullDelete.affected) {
      throw new AppError('Student not deleted');
    }
  }
}

export default UpdateStudentService;
