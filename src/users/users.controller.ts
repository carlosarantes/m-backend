import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('v1/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  store(data: any): Promise<unknown> {
    return this.userService.store(data);
  }

  @Get()
  findAll(): Promise<unknown> {
    return this.userService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<unknown> {
    return this.userService.findById(id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  delete(@Param('id') id: string): Promise<unknown> {
    return this.userService.delete(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any): Promise<unknown> {
    return this.userService.update(id, data);
  }

  @Patch(':id/upload-avatar')
  uploadAvatar(@Param('id') id: string, @Body() data: any): Promise<unknown> {
    return this.userService.update(id, data);
  }
}
