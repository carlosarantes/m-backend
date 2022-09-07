import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../users/users.module';
import {
  ImageReportSchema,
  ImageReport,
} from '../users/schemas/image_report.schema';
import { ImageReportService } from './image-report.service';
import { ImageReportController } from './image_report.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ImageReport.name, schema: ImageReportSchema },
    ]),
    forwardRef(() => UsersModule),
  ],
  controllers: [ImageReportController],
  providers: [ImageReportService],
})
export class ImageReportsModule {}
