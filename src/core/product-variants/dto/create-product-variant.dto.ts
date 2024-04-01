import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator'

export class CreateProductVariantDto {
  @ApiProperty({ example: 'Variant Name' })
  @IsNotEmpty()
  name: string

  @ApiProperty()
  @IsOptional()
  image: Express.Multer.File

  @ApiProperty()
  @IsBoolean()
  isDefault: boolean
}
