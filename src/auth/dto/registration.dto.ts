import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegistrationDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  password: string;
}
