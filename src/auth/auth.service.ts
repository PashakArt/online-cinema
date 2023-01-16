import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
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
    private readonly configService: ConfigService,
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

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
    }
    const isValidPassword = await compare(password, user.passwordHash);
    if (!isValidPassword) {
      throw new UnauthorizedException(WRONG_PASSWORD_ERROR);
    }
    return { email };
  }

  async findUser(email: string) {
    return this.usersService.findByEmail(email);
  }

  async login(email: string) {
    const payload = { email };
    const refresh_token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME'),
    });
    await this.usersService.setRefreshToken(email, refresh_token);
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token,
    };
  }
}
