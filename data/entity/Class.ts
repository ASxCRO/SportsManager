import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { AgeGroup } from '../../Enums/AgeGroup';
import { Sport } from './Sport';

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

  @Column()
  duration: string;

  @Column()
  description: string;
}
