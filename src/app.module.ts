import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ImageReportsModule } from './image_reports/image_reports.module';
import { AuthModule } from './auth/auth.module';

import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://carlos:ArtrsaTu695412@cluster0.6czwu3t.mongodb.net/?retryWrites=true&w=majority',
    ),
    UsersModule,
    AuthModule,
    ImageReportsModule,
  ],
})
export class AppModule {}
