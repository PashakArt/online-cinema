import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = this.usersRepository.create({
      ...createUserDto,
      passwordHash: createUserDto.password,
    });
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async findByEmail(email: string) {
    return this.usersRepository.findOneBy({ email });
  }
}
