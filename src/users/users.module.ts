import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

import { User, UserSchema } from './schemas/user.schema';
import { MulterModule } from '@nestjs/platform-express';
import { ImageReportService } from '../image_reports/image-report.service';
import { ImageReportsModule } from '../image_reports/image_reports.module';
import { ImageReport, ImageReportSchema } from './schemas/image_report.schema';
import { diskStorage } from 'multer';

@Module({
  imports: [
    MulterModule.register({
      dest: './upload',
      storage: diskStorage({
        destination: async (req, file, cb) => {
          return cb(null, `./upload/`);
        },
        filename: (req, file, cb) => {
          const fileNameParts = file.originalname.split('.');
          const extension = fileNameParts[fileNameParts.length - 1];

          const name = fileNameParts[0];
          const finalImageName = Buffer.from(Date.now() + name + Date.now())
            .toString('base64')
            .toLocaleLowerCase()
            .substring(0, 32);

          return cb(null, finalImageName + '.' + extension);
        },
      }),
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: ImageReport.name, schema: ImageReportSchema },
    ]),
    forwardRef(() => ImageReportsModule),
  ],
  controllers: [UsersController],
  providers: [UsersService, ImageReportService],
  exports: [UsersService],
})
export class UsersModule {}
