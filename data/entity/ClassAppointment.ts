import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { Class } from './Class';
import { User } from './User';

@Entity()
export class ClassAppointment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Class, (classs) => classs.classAppointments)
  classs: Class;

  @ManyToMany(() => User, (user) => user.classAppointments)
  users: User[];

  @CreateDateColumn()
  dateStarting: Date;

  @Column()
  description: string;
}
