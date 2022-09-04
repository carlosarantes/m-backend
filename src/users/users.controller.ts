import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto, UploadAvatarDto } from './dto';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
@ApiTags('users')
@Controller('v1/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(): Promise<unknown> {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findById(@Param('id') id: string): Promise<unknown> {
    return this.userService.findById(id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  delete(@Param('id') id: string): Promise<unknown> {
    return this.userService.delete(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() data: UpdateUserDto,
  ): Promise<unknown> {
    return this.userService.update(id, data);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id/upload-avatar')
  uploadAvatar(
    @Param('id') id: string,
    @Body() data: UploadAvatarDto,
  ): Promise<unknown> {
    return null;
    //return this.userService.update(id, data);
  }
}
