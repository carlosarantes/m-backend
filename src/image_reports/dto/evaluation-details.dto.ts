import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EvaluationDetailsDto {
  @ApiProperty({
    required: false,
    description: 'Evaluation on adult content',
    example: '70% of adult content',
  })
  @IsString()
  @IsOptional()
  ADULT?: string;

  @ApiProperty({
    required: false,
    description: 'Evaluation on spoof content',
    example: 'No spoof content',
  })
  @IsString()
  @IsOptional()
  SPOOF?: string;

  @ApiProperty({
    required: false,
    description: 'Evaluation on violent content',
    example: '30% of violence content',
  })
  @IsString()
  @IsOptional()
  VIOLENCE?: string;

  @ApiProperty({
    required: false,
    description: 'Evaluation on racist content',
    example: 'No racist content',
  })
  @IsString()
  @IsOptional()
  RACY?: string;
}
