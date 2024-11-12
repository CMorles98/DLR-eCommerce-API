import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, FilterQuery } from 'mongoose'
import { ProductVariant } from '../../core/product-variants/entities/product-variant.entity'

@Injectable()
export class ProductVariantsService {
  constructor(
    @InjectModel(ProductVariant.name)
    private readonly productVariantModel: Model<ProductVariant>,
  ) {}

  async findOne(filter?: FilterQuery<ProductVariant>): Promise<ProductVariant> {
    const record = await this.productVariantModel
      .findOne({ active: true, ...filter })
      .exec()
    if (!record) {
      throw new NotFoundException()
    }
    return record
  }

  async find(): Promise<ProductVariant[]> {
    return await this.productVariantModel.find({ active: true }).exec()
  }
}
