import { ApiProperty } from '@nestjs/swagger'
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator'
import mongoose from 'mongoose'

export class CreateCategoryDto {
  @ApiProperty()
  @MaxLength(100)
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty()
  @IsOptional()
  @IsArray()
  parent: mongoose.ObjectId[]
}
