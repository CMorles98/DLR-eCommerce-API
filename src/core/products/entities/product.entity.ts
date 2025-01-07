import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ApiProperty } from '@nestjs/swagger'
import { Document } from 'mongoose'
import { v4 as UUID4 } from 'uuid'
import { ProductVariant } from '../../../core/product-variants/entities/product-variant.entity'

@Schema()
export class Product extends Document {
  @Prop({ type: String, default: () => UUID4() })
  _id: string

  @ApiProperty()
  @Prop({ required: true, maxlength: 250, type: String })
  name: string

  @ApiProperty()
  @Prop({ maxlength: 250, type: String })
  slug: string

  @ApiProperty()
  @Prop({ maxlength: Number.MAX_SAFE_INTEGER, type: String })
  description: string

  @ApiProperty()
  @Prop({ required: true, type: Number, min: 0 })
  qty: number

  @ApiProperty()
  @Prop({ required: true, type: String })
  categoryId: string

  @ApiProperty()
  @Prop({ required: true, maxlength: 50, type: String })
  brand: string

  @ApiProperty()
  @Prop({ required: true, maxlength: 250, type: String })
  status: string

  @ApiProperty({
    type: [
      {
        user: String,
        name: String,
        email: String,
        rating: Number,
        review: String,
        date: Date,
      },
    ],
  })
  @Prop({
    type: [
      {
        user: String,
        name: String,
        email: String,
        rating: Number,
        review: String,
        date: Date,
      },
    ],
  })
  reviews: {
    user?: string
    name: string
    email: string
    rating: number
    review: string
    date: Date
  }[]

  @ApiProperty({
    type: [{ type: Array<ProductVariant>, ref: 'ProductVariant' }],
  })
  @Prop({ type: [{ type: Array<ProductVariant>, ref: 'ProductVariant' }] })
  productVariants: ProductVariant[]

  @ApiProperty({ type: [String], default: [] })
  @Prop({ type: [String] })
  tags: string[]

  @ApiProperty()
  @Prop({ type: Boolean, default: false })
  featured: boolean

  @ApiProperty()
  @Prop({ type: Number, max: 5, default: null })
  rate: number

  @ApiProperty()
  @Prop({ type: String, default: null })
  bgColor?: string

  @ApiProperty({ type: { startDate: Date, endDate: Date, percentage: Number } })
  @Prop({
    type: { startDate: Date, endDate: Date, percentage: Number },
    default: null,
  })
  offer?: {
    startDate: Date
    endDate?: Date | null
    percentage: number
  }
}

export const productSchema = SchemaFactory.createForClass(Product)
