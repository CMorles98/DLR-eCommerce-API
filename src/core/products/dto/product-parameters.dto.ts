import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class ProductParametersDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  name: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  category: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  brand: string
}
