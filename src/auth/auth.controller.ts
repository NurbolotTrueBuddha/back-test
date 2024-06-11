import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { UserJwtGuard, UserLocalGuard } from './framework/guards';
import { User } from './framework/decorators';
import { AuthService } from './auth.service';
import { LoginRequest, LoginResponse } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @UseGuards(UserLocalGuard)
  @ApiOperation({
    summary: 'Для логина user',
  })
  @ApiBody({
    type: LoginRequest,
  })
  @ApiResponse({
    status: 201,
    type: LoginResponse,
  })
  @Post('login')
  async login(@User() user) {
    return this.service.login(user);
  }

  @ApiBearerAuth()
  @UseGuards(UserJwtGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
