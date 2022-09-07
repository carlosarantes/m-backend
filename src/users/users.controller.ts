import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Patch,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageReportService } from '../image_reports/image-report.service';

@ApiBearerAuth()
@ApiTags('users')
@Controller('v1/users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly imageReportService: ImageReportService,
  ) {}

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
  @Patch(':userId/upload-avatar')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  uploadAvatar(
    @Req() req,
    @Param('userId') userId: string,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /[jpeg-jpg-png]/,
        })
        .addMaxSizeValidator({
          maxSize: 150000,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ): Promise<unknown> {
    return this.imageReportService.analyzeImage(file, userId, req.user.sub);
  }
}
