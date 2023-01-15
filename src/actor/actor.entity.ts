import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Gender } from './enums/gender.enum';

@Entity()
export class Actor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    type: 'enum',
    enum: Gender,
  })
  gender: Gender;
}
