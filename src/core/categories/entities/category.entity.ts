import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ApiProperty } from '@nestjs/swagger'
import { MaxLength } from 'class-validator'
import { Document } from 'mongoose'
import { v4 as UUID4 } from 'uuid'

@Schema()
export class Category extends Document {
  @Prop({ type: String, default: () => UUID4() })
  _id: string

  @ApiProperty()
  @Prop({ type: String, required: true })
  @MaxLength(100)
  name: string
}
export const categoriesSchema = SchemaFactory.createForClass(Category)
