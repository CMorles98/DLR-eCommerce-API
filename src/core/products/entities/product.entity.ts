import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ApiProperty } from '@nestjs/swagger'
import { Document } from 'mongoose'
import { v4 as UUID4 } from 'uuid'
import { AdditionalInfo } from '../interfaces/additional-info.interface'
import { ProductVariant } from '../../../core/product-variants/entities/product-variant.entity'

@Schema()
export class Product extends Document {
  @Prop({ type: String, default: () => UUID4() })
  _id: string

  @ApiProperty()
  @Prop({ required: true, maxlength: 100, type: String })
  name: string

  @ApiProperty()
  @Prop({ maxlength: Number.MAX_SAFE_INTEGER, type: String })
  description?: string

  @ApiProperty()
  @Prop({ required: true, type: Number })
  price: number

  @ApiProperty()
  @Prop({ required: true, maxlength: 50, type: String })
  sku: string

  @ApiProperty()
  @Prop({ type: String })
  categoryId: string

  @ApiProperty()
  @Prop({ required: true, maxlength: 50, type: String })
  brand: string

  @ApiProperty()
  @Prop({
    type: [{ type: String, ref: 'ProductVariant' }],
    default: [],
  })
  productVariants: ProductVariant[]

  @ApiProperty()
  @Prop({ required: true })
  stock: number

  @ApiProperty()
  @Prop({ type: [Object] })
  reviews?: object[]

  @ApiProperty()
  @Prop({ type: Array<AdditionalInfo> })
  additionalInformation?: AdditionalInfo[]

  @ApiProperty()
  @Prop({ type: [String] })
  relatedProducts?: string[]

  @ApiProperty()
  @Prop({ default: false })
  isTopRated: boolean

  @ApiProperty()
  @Prop({ type: [String] })
  tags: string[]

  @ApiProperty()
  @Prop({ type: Number, max: 100, default: 0 })
  offerPercentage: number

  @ApiProperty()
  @Prop({ type: Number, max: 5 })
  rate?: number

  @ApiProperty()
  @Prop({ type: Boolean, default: true })
  active: boolean

  @ApiProperty()
  @Prop({ type: String })
  defaultImgUrl: string

  @ApiProperty()
  priceDiscount: number
}

export const productSchema = SchemaFactory.createForClass(Product)
