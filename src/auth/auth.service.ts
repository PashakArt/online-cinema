import { Injectable } from '@nestjs/common';
import { genSaltSync, hash } from 'bcrypt';
import { UsersService } from '../users/users.service';
import { RegistrationDto } from './dto/registration.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async register({ email, password, username }: RegistrationDto) {
    const salt = genSaltSync(10);
    const passwordHash = await hash(password, salt);
    return this.usersService.create({
      email,
      username,
      password: passwordHash,
    });
  }

  async findUser(email: string) {
    return this.usersService.findByEmail(email);
  }
}
