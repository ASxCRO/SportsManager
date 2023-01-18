import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { AgeGroup } from '../../Enums/AgeGroup';
import { ClassAppointment } from './ClassAppointment';
import { Sport } from './Sport';
import { User } from './User';

@Entity()
export class Class {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: AgeGroup,
    default: AgeGroup.CHILDREN,
  })
  ageGroup: AgeGroup;

  @ManyToOne(() => Sport, (sport) => sport.classes)
  sport: Sport;

  @OneToMany(
    () => ClassAppointment,
    (classApointments) => classApointments.classs
  )
  classAppointments: ClassAppointment[];

  @ManyToMany(() => User, (user) => user.classes)
  users: User[];

  @Column()
  duration: string;

  @Column()
  description: string;
}
