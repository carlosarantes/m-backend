import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { EvaluationDetailsDto } from './dto/evaluation-details.dto';
import { ImageReportService } from './image-report.service';

@ApiBearerAuth()
@ApiTags('image-report')
@Controller('v1/image-report')
export class ImageReportController {
  constructor(private readonly imageReportService: ImageReportService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(): Promise<unknown> {
    return this.imageReportService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findById(@Param('id') id: string): Promise<unknown> {
    return this.imageReportService.findById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id/approve')
  approve(
    @Req() req,
    @Param('id') id: string,
    @Body() evaluationDetails: EvaluationDetailsDto,
  ): Promise<unknown> {
    return this.imageReportService.approvation(
      id,
      req.user.sub,
      true,
      evaluationDetails,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id/disapprove')
  disApprove(
    @Req() req,
    @Param('id') id: string,
    @Body() evaluationDetails: EvaluationDetailsDto,
  ): Promise<unknown> {
    return this.imageReportService.approvation(
      id,
      req.user.sub,
      false,
      evaluationDetails,
    );
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  delete(@Param('id') id: string): Promise<unknown> {
    return this.imageReportService.delete(id);
  }
}
