import { Exclude } from 'class-transformer';
import { Review } from 'src/review/review.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ unique: true })
  email: string;

  @Column()
  username: string;

  @Column()
  @Exclude()
  passwordHash: string;

  @OneToMany(() => Review, (review: Review) => review.author)
  reviews: Review[];
}
