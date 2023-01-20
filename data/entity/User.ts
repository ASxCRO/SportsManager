import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { UserRole } from '../../Enums/Roles';
import { Class } from './Class';
import { ClassAppointment } from './ClassAppointment';
import { Review } from './Review';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column()
  verified: boolean;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @ManyToMany(() => Class, {
    cascade: true,
  })
  @JoinTable()
  classes: Class[];

  @ManyToMany(() => ClassAppointment, {
    cascade: true,
  })
  @JoinTable()
  classAppointments: ClassAppointment[];
}
