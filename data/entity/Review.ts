import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Rate } from '../../Enums/Rate';
import { Class } from './Class';
import { User } from './User';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comment: string;

  @Column({
    type: 'enum',
    enum: Rate,
    default: Rate.AVERAGE,
  })
  rate: Rate;

  @ManyToOne(() => Class, (classs) => classs.reviews)
  class: Class;
}
