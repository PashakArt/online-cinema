import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, genSaltSync, hash } from 'bcrypt';
import { UsersService } from '../users/users.service';
import { USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR } from './auth.constants';
import { RegistrationDto } from './dto/registration.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

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

  async validateUser(email: string, password: string) {
    const user = await this.findUser(email);
    if (!user) {
      throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
    }
    const isValidPassword = await compare(password, user.passwordHash);
    if (!isValidPassword) {
      throw new UnauthorizedException(WRONG_PASSWORD_ERROR);
    }
    return { email };
  }

  async login(email: string) {
    const payload = { email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
