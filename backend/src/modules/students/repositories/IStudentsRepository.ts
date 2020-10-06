import Student from '../infra/typeorm/entities/Student';
import ICreateStudentDTO from '../dtos/ICreateStudentDTO';
import IFindStudentsDTO from '../dtos/IFindStudentsDTO';

export default interface IStudentsRepository {
  create(data: ICreateStudentDTO): Promise<Student>;
  findByRA(ra: number): Promise<Student | undefined>;
  findByCPF(cpf: string): Promise<Student | undefined>;
  findStudents(data: IFindStudentsDTO): Promise<Student[]>;
  save(student: Student): Promise<Student>;
  delete(id: string): Promise<void>;
}
