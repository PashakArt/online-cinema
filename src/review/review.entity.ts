import { User } from '../users/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Movie } from 'src/movie/movie.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => User, (author: User) => author.reviews)
  author: User;

  @ManyToOne(() => Movie, (movie: Movie) => movie.reviews)
  movie: Movie;

  @Column()
  title: string;

  @Column()
  description: string;
}
