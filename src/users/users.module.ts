import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

import { User, UserSchema } from './schemas/user.schema';
import { MulterModule } from '@nestjs/platform-express';
import { ImageReportService } from '../image_reports/image-report.service';
import { ImageReportsModule } from '../image_reports/image_reports.module';
import { ImageReport, ImageReportSchema } from './schemas/image_report.schema';

@Module({
  imports: [
    MulterModule.register({
      dest: './upload',
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: ImageReport.name, schema: ImageReportSchema },
    ]),
    ImageReportsModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, ImageReportService],
  exports: [UsersService],
})
export class UsersModule {}
