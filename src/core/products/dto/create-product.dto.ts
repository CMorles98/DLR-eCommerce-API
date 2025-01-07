import { ApiProperty } from '@nestjs/swagger'
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Max,
  MaxLength,
  Min,
} from 'class-validator'
import { CreateProductVariantDto } from '../../../core/product-variants/dto/create-product-variant.dto'
import { OfferDto, ReviewDto } from './offer-date.dto'

export class CreateProductDto {
  @ApiProperty({ required: false })
  @IsNotEmpty()
  @MaxLength(250)
  name: string

  @ApiProperty()
  @MaxLength(250)
  slug: string

  @ApiProperty({ required: false })
  @MaxLength(Number.MAX_SAFE_INTEGER)
  description: string

  @ApiProperty({ required: false })
  @IsNotEmpty()
  categoryId: string

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @MaxLength(50)
  brand: string

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @MaxLength(250)
  status: string

  @ApiProperty({ type: Array<ReviewDto> })
  @IsArray()
  reviews: ReviewDto[]

  @ApiProperty({ type: Array<CreateProductVariantDto> })
  @ArrayNotEmpty()
  productVariants: CreateProductVariantDto[]

  @ApiProperty({ type: [String] })
  @ArrayNotEmpty()
  tags: string[]

  @ApiProperty({ required: false })
  @IsBoolean()
  featured: boolean

  @ApiProperty({ required: false })
  @IsNumber()
  @Max(5)
  rate: number

  @ApiProperty({ required: false })
  @IsOptional()
  bgColor?: string

  @ApiProperty({
    type: OfferDto,
    description: 'The offer date range',
    required: false,
  })
  @IsOptional()
  offer?: OfferDto

  @ApiProperty({ required: false })
  @IsNumber()
  @Min(0)
  qty: number
}
