// auth/auth.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../auth/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: CreateUserDto) {
    return this.authService.signupWithEmail(dto);
  }

  @Post('login')
  login(@Body() body: { email: string; password: string }) {
    return this.authService.loginWithEmail(body.email, body.password);
  }
}
