import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Rate } from '../../enums/Rate';
import { Class } from './Class';

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
