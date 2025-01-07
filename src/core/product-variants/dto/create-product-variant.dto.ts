import { ApiProperty } from '@nestjs/swagger'
import { AdditionalInfo } from '@src/core/products/interfaces/additional-info.interface'
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  MaxLength,
  Min,
} from 'class-validator'

export class CreateProductVariantDto {
  @ApiProperty({ example: 'Variant Name' })
  @IsNotEmpty()
  name: string

  @ApiProperty()
  @IsOptional()
  image: Express.Multer.File

  @ApiProperty()
  @IsOptional()
  imgUrl: string

  @ApiProperty()
  @IsBoolean()
  isDefault: boolean

  @ApiProperty({ type: Array<AdditionalInfo> })
  @IsArray()
  additionalInformation: AdditionalInfo[] //size, storage and other specs

  @ApiProperty({ required: false })
  @IsNumber()
  @Min(0)
  price: number

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @MaxLength(50)
  sku: string
}
