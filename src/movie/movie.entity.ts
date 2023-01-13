import { Review } from 'src/review/review.entity';
import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Movie {

  @PrimaryGeneratedColumn()
  id?: number;
  
  @OneToMany(() => Review, (review: Review) => review.movie)
  reviews: Review[];
}
