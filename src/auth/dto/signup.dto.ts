import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class SignupDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @Length(6)
  password: string;
}
