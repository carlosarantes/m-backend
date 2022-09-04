import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UploadAvatarDto {
  @ApiProperty({
    required: false,
    description: 'Current avatar of user',
    example: 'avatar.jpg',
  })
  @IsString()
  @IsOptional()
  current_avatar?: string;
}
