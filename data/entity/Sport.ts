import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Class } from './Class';

@Entity()
export class Sport {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Class, (classs) => classs.sport)
  classes: Class[];
}
