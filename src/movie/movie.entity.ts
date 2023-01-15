import { Director } from '../director/director.entity';
import { Review } from '../review/review.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Actor } from '../actor/actor.entity';
import { Genre } from './enums/genre.enum';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Review, (review: Review) => review.movie)
  reviews: Review[];

  @ManyToMany(() => Director)
  @JoinTable()
  directors: Director[];

  @ManyToMany(() => Actor)
  @JoinTable()
  actors: Actor[];

  @Column({
    type: 'enum',
    enum: Genre,
    array: true,
  })
  genres: Genre[];
}
