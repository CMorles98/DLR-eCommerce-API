import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, MaxLength } from 'class-validator'

export class CreateCategoryDto {
  @ApiProperty()
  @MaxLength(100)
  @IsString()
  @IsNotEmpty()
  name: string
}
