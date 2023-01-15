import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movie.entity';

@Injectable()
export class MovieService {
    constructor(
        @InjectRepository(Movie) private readonly movieRepository: Repository<Movie>
    ) {}

    async addMovie() {}

    async removeMovie() {}

    async updateMove() {}

    async findByGenre() {}

    async findByDirector() {}

    async findByActor() {}
}
