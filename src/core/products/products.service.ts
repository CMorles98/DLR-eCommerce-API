import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { CategoriesService } from '../categories/categories.service'
import { InjectModel } from '@nestjs/mongoose'
import { isEmpty, isNotEmpty } from 'class-validator'
import { Model, FilterQuery } from 'mongoose'
import { Product } from './entities/product.entity'
import { ProductParametersDto, CreateProductDto, UpdateProductDto } from './dto'
import { queryBuilder } from '../../common/helpers/filter-query.helper'
import { S3Helper } from 'src/common/helpers/aws-s3.helper'
import { ProductVariant } from '../product-variants/entities/product-variant.entity'
import { CreateProductVariantDto } from '../product-variants/dto/create-product-variant.dto'
import { UpdateProductVariantDto } from '../product-variants/dto/update-product-variant.dto'

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
    private readonly categoryService: CategoriesService,
    private readonly s3Helper: S3Helper,
  ) {}

  async findOne(filter?: FilterQuery<Product>): Promise<Product | null> {
    const record = await this.productModel.findOne(filter).exec()
    if (isEmpty(record)) {
      throw new NotFoundException()
    }
    return record
  }

  async find(parameters: ProductParametersDto): Promise<Product[]> {
    const filters = queryBuilder.loadFilters<Product>(parameters)
    const products = await this.productModel
      .find(filters)
      .select([
        'name',
        'stock',
        'rate',
        'price',
        'offerPercentage',
        'defaultImgUrl',
        'categories',
      ])
      .exec()
    return products.map((product) => {
      product['priceDiscount'] =
        product.offerPercentage > 0
          ? product.price * (1 - product.offerPercentage / 100)
          : product.price
      return product
    })
  }

  async create(input: CreateProductDto): Promise<Product> {
    await this.validateProduct(
      input.name,
      input.categoryId,
      input.productVariants,
    )

    const variantImageUrls = await this.genImageUrls(input)

    const defaultVariantIndex = await this.findDefaultVariant(
      input.productVariants,
    )

    const createdProduct = new this.productModel({
      ...input,
      defaultImgUrl: variantImageUrls[defaultVariantIndex],
      productVariants: input.productVariants.map((variant, index) => ({
        ...variant,
        imageUrl: variantImageUrls[index],
      })),
    })

    return await createdProduct.save()
  }

  async update(id: string, input: UpdateProductDto): Promise<Product | null> {
    await this.validateProduct(
      input.name,
      input.categoryId,
      input.productVariants,
      id,
    )

    const existingProduct = await this.findOne({ _id: id })

    const defaultVariantIndex = await this.findDefaultVariant(
      input.productVariants,
    )

    await this.removeUnusedImages(
      existingProduct.productVariants,
      input.productVariants,
    )

    const updatedVariants = await this.updateProductVariants(
      input.productVariants,
    )

    return await this.updateProductData(
      existingProduct._id,
      input,
      defaultVariantIndex,
      updatedVariants,
    )
  }

  async delete(id: string): Promise<Product | null> {
    return await this.productModel.findByIdAndDelete(id)
  }

  private async removeUnusedImages(
    existingVariants: ProductVariant[],
    updatedVariants: any[],
  ): Promise<void> {
    const existingImgUrls = existingVariants.map((e) => e.imgUrl)
    const updatedImgUrls = updatedVariants.map((e) => e.imgUrl)

    const imagesToRemove = existingImgUrls
      .filter((e) => !updatedImgUrls.includes(e))
      .concat(updatedImgUrls.filter((e) => !existingImgUrls.includes(e)))

    for (const imgUrl of imagesToRemove) {
      await this.s3Helper.deleteFile(imgUrl)
    }
  }

  private async updateProductVariants(
    variants: UpdateProductVariantDto[],
  ): Promise<ProductVariant[]> {
    const updatedVariants: ProductVariant[] = []
    for (const variant of variants) {
      if (isNotEmpty(variant.image) && isEmpty(variant.imgUrl)) {
        variant.imgUrl = await this.s3Helper.uploadFile(variant.image.buffer)
        variant.image = null
      }
      updatedVariants.push({
        _id: variant.id,
        imgUrl: variant.imgUrl,
        isDefault: variant.isDefault,
        name: variant.name,
      } as ProductVariant)
    }
    return updatedVariants
  }

  private async updateProductData(
    productId: string,
    input: UpdateProductDto,
    defaultVariantIndex: number,
    updatedVariants: ProductVariant[],
  ): Promise<Product | null> {
    const updateInput = {
      ...input,
      defaultImgUrl: input.productVariants[defaultVariantIndex].imgUrl,
      productVariants: updatedVariants,
    }

    return await this.productModel.findByIdAndUpdate(productId, updateInput, {
      new: true,
    })
  }

  private async validateProduct(
    name: string,
    categoryId: string,
    productVariants: any[],
    id?: string,
  ) {
    await this.checkProductExists(name, id)
    await this.checkCategoryExists(categoryId)
    this.validateProductVariants(productVariants)
  }

  private async checkProductExists(name: string, id?: string) {
    const filter: FilterQuery<Product> = { active: true, name }
    if (id) {
      filter._id = { $ne: id }
    }
    const exists = await this.productModel.findOne(filter)
    if (exists) {
      throw new BadRequestException('This product already exists')
    }
  }

  private async checkCategoryExists(categoryId: string) {
    const categoryExists = await this.categoryService.findOne({
      _id: categoryId,
    })
    if (isEmpty(categoryExists)) {
      throw new NotFoundException('Could not find the associated category')
    }
  }

  private validateProductVariants(productVariants: any[]): void {
    if (productVariants.length === 0) {
      throw new BadRequestException('At least 1 variant is needed')
    }
  }

  private async genImageUrls({ productVariants }: CreateProductDto) {
    const variantImageUrls: string[] = []
    for (const variant of productVariants) {
      const imageUrl = await this.s3Helper.uploadFile(variant.image.buffer)
      variantImageUrls.push(imageUrl)
    }

    return { variantImageUrls }
  }

  private async findDefaultVariant(
    productVariants: CreateProductVariantDto[] | UpdateProductVariantDto[],
  ) {
    const defaultVariantIndex = productVariants.findIndex(
      (variant: CreateProductVariantDto | UpdateProductVariantDto) =>
        variant.isDefault,
    )

    if (defaultVariantIndex === -1) {
      throw new BadRequestException(
        'At least one variant must be designated as default',
      )
    }

    return defaultVariantIndex
  }
}
