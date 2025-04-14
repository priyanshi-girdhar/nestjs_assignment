import { Controller, Get, Put, Body, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

import { UpdateProfileDto } from  '../auth/dto/update-profile.dto';


import { CurrentUser } from '../common/decorators/current-user.decorator';


@Controller('user')
@UseGuards(AuthGuard('jwt'))

export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  getProfile(@CurrentUser() user: any) {
    return this.userService.getUserProfile(user.userId);
  }

  @Put('profile')
  updateProfile(@CurrentUser() user: any, @Body() dto: UpdateProfileDto) {
    return this.userService.updateUserProfile(user.userId, dto);
  }
}