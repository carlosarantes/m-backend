import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ImageReportsModule } from './image_reports/image_reports.module';
import { AuthModule } from './auth/auth.module';

import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongodb/nest'),
    UsersModule,
    ImageReportsModule,
    AuthModule,
  ],
})
export class AppModule {}
