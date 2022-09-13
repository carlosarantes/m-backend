import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsEnum,
  IsBoolean,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../enums';

export class CreateUserDto {
  @ApiProperty({
    required: true,
    description: 'Name of user to be created',
    example: 'Charles',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(40)
  name: string;

  @ApiProperty({
    required: true,
    description: 'Date of birthday of user to be created',
    example: '06/06/1996',
  })
  @IsString()
  @IsNotEmpty()
  date_birthday: string;

  @ApiProperty({
    required: true,
    description: 'E-mail of user to be created',
    example: 'charles.a@gmail.com',
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    required: true,
    description: 'Password of user to be creaed',
    example: 'Aefsd#$6958',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/)
  password: string;

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

  @ApiProperty({
    required: false,
    description: 'User role',
    default: 'COMMON',
    enum: ['ADMIN', 'COMMON'],
  })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
}
