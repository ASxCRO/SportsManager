import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Sport {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
