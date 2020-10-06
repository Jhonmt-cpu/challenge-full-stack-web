import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('students')
class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int')
  RA: string;

  @Column()
  name: string;

  @Column()
  CPF: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Student;
