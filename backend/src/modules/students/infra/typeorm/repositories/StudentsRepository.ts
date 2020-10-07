import { DeleteResult, getRepository, Repository } from 'typeorm';

import IStudentsRepository from '@modules/students/repositories/IStudentsRepository';
import ICreateStudentDTO from '@modules/students/dtos/ICreateStudentDTO';
import IFindStudentsDTO from '@modules/students/dtos/IFindStudentsDTO';
import IFindStudentByRAOrCPFDTO from '@modules/students/dtos/IFindStudentByRAOrCPFDTO';

import Student from '../entities/Student';

class StudentsRepository implements IStudentsRepository {
  private ormRepository: Repository<Student>;

  constructor() {
    this.ormRepository = getRepository(Student);
  }

  public async findById(id: string): Promise<Student | undefined> {
    const student = await this.ormRepository.findOne(id);

    return student;
  }

  public async findByRAOrCPFOrEmail({
    ra,
    email,
    cpf,
  }: IFindStudentByRAOrCPFDTO): Promise<Student | undefined> {
    const student = await this.ormRepository.findOne({
      where: [{ ra }, { cpf }, { email }],
    });

    return student;
  }

  public async findByEmail(email: string): Promise<Student | undefined> {
    const student = await this.ormRepository.findOne({
      where: {
        email,
      },
    });

    return student;
  }

  public async findStudents({
    name,
    email,
    cpf,
    ra,
  }: IFindStudentsDTO): Promise<Student[]> {
    const students = await this.ormRepository.find({
      where: [{ cpf }, { name }, { ra }, { email }],
    });

    return students;
  }

  public async findAllStudents(): Promise<Student[]> {
    const students = await this.ormRepository.find({
      order: {
        name: 'ASC',
      },
    });

    return students;
  }

  public async create({
    name,
    email,
    ra,
    cpf,
  }: ICreateStudentDTO): Promise<Student> {
    const student = await this.ormRepository.create({
      name,
      email,
      cpf,
      ra,
    });

    await this.ormRepository.save(student);

    return student;
  }

  public async save(student: Student): Promise<Student> {
    return this.ormRepository.save(student);
  }

  public async delete(id: string): Promise<DeleteResult> {
    const student = await this.ormRepository.delete(id);

    return student;
  }
}

export default StudentsRepository;
