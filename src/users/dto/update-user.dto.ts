import {
  IsOptional,
  IsString,
  MinLength,
  MaxLength,
  IsBoolean,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    required: false,
    description: 'Name of user to be updated',
    example: 'Charles',
  })
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(40)
  name: string;

  @ApiProperty({
    required: false,
    description: 'Date of birthday of user to be created',
    example: '06/06/1996',
  })
  @IsString()
  @IsOptional()
  date_birthday: string;

  @ApiProperty({
    required: false,
    description: 'Password of user to be creaed',
    example: 'Aefsd#$6958',
  })
  @IsString()
  @IsOptional()
  password?: string;

  @ApiProperty({
    required: false,
    description: 'Current avatar of user',
    example: 'avatar.jpg',
  })
  @IsString()
  @IsOptional()
  current_avatar?: string;

  @ApiProperty({
    required: false,
    default: true,
    description: 'Current avatar is approved?',
  })
  @IsBoolean()
  @IsOptional()
  avatar_approved?: boolean;
}
