import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { ImageReportsModule } from './image_reports/image_reports.module';
import { AuthModule } from './auth/auth.module';

import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URL),
    UsersModule,
    AuthModule,
    ImageReportsModule,
  ],
})
export class AppModule {}
