import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


enum Gender {
    Female = 'female',
    Male = 'male',
}


@Entity()
export class Actor {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column( {
        type: 'enum',
        enum: Gender
    } )
    gender: Gender;



}