import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@ApiTags('auth')
@Controller('v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: AuthDto })
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async auth(@Request() req): Promise<unknown> {
    return this.authService.login(req.user);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(@Body() data: CreateUserDto) {
    return this.authService.register(data);
  }
}
