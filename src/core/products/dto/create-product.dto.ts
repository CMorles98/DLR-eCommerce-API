import { ApiProperty } from '@nestjs/swagger'
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsDecimal,
  IsNotEmpty,
  IsNumber,
  IsUUID,
  Max,
  MaxLength,
  Min,
} from 'class-validator'
import { AdditionalInfo } from '../interfaces/additional-info.interface'
import { CreateProductVariantDto } from '../../../core/product-variants/dto/create-product-variant.dto'

export class CreateProductDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(100)
  name: string

  @ApiProperty()
  @MaxLength(Number.MAX_SAFE_INTEGER)
  description: string

  @ApiProperty()
  @IsDecimal({ decimal_digits: '2', force_decimal: true })
  @Min(0)
  price: number

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(50)
  sku: string

  @ApiProperty()
  @IsUUID()
  categoryId: string

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(50)
  brand: string

  @ApiProperty({ type: Array<CreateProductVariantDto> })
  @ArrayNotEmpty()
  productVariants: CreateProductVariantDto[]

  @ApiProperty()
  @IsNumber()
  @Min(0)
  stock: number

  @ApiProperty({ type: [Object] })
  @IsArray()
  reviews: object[]

  @ApiProperty({ type: Array<AdditionalInfo> })
  @IsArray()
  additionalInformation: AdditionalInfo[]

  @ApiProperty({ type: [String] })
  @IsArray()
  relatedProductIds: string[]

  @ApiProperty()
  @IsBoolean()
  isTopRated: boolean

  @ApiProperty({ type: [String] })
  @ArrayNotEmpty()
  tags: string[]

  @ApiProperty()
  @IsNumber()
  @Max(100)
  offerPercentage: number

  @ApiProperty()
  @IsNumber()
  @Max(5)
  rate: number
}
