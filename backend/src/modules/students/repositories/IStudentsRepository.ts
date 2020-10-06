import Student from '../infra/typeorm/entities/Student';
import ICreateStudentDTO from '../dtos/ICreateStudentDTO';
import IFindStudentsDTO from '../dtos/IFindStudentsDTO';
import IFindStudentByRAOrCPFDTO from '../dtos/IFindStudentByRAOrCPFDTO';

export default interface IStudentsRepository {
  create(data: ICreateStudentDTO): Promise<Student>;
  findById(id: string): Promise<Student | undefined>;
  findByRAOrCPFOrEmail(
    data: IFindStudentByRAOrCPFDTO,
  ): Promise<Student | undefined>;
  findStudents(data: IFindStudentsDTO): Promise<Student[]>;
  save(student: Student): Promise<Student>;
  delete(id: string): Promise<void>;
}
