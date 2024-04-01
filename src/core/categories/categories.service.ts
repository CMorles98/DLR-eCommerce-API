import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Model, FilterQuery } from 'mongoose'
import { Category } from './entities/category.entity'

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
  ) {}

  async findOne(filter?: FilterQuery<Category>) {
    const record = this.categoryModel.findOne(filter).exec()
    if (!record) throw new NotFoundException()
    return record
  }

  async find() {
    return await this.categoryModel.find().exec()
  }

  async create(input: CreateCategoryDto) {
    const exists = await this.categoryModel.findOne({ name: input.name }).exec()

    if (exists) {
      throw new BadRequestException('this category already exists')
    }

    const createdCategory = new this.categoryModel(input)
    return await createdCategory.save()
  }

  async update(id: string, input: UpdateCategoryDto) {
    const exists = await this.categoryModel
      .findOne({ $and: [{ name: input.name, _id: { $ne: id } }] })
      .exec()

    if (exists) {
      throw new BadRequestException('this category already exists')
    }

    const updatedCategory = this.categoryModel.findByIdAndUpdate(id, input, {
      new: true,
    })

    return updatedCategory
  }

  async delete(id: string) {
    return await this.categoryModel.findByIdAndDelete(id)
  }
}
