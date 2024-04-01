import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common'
import { ProductsService } from './products.service'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from 'src/common/guards/auth.guard'
import { AdminGuard } from 'src/common/guards/admin.guard'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { ProductParametersDto } from './dto/product-parameters.dto'

@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiTags('products')
@Controller('api/v1/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(AdminGuard)
  @Post()
  async create(@Body() input: CreateProductDto) {
    return await this.productsService.create(input)
  }

  @Get()
  async findAll(@Query() parameters: ProductParametersDto) {
    return await this.productsService.find(parameters)
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.productsService.findOne({ _id: id })
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() input: UpdateProductDto,
  ) {
    return await this.productsService.update(id, input)
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return await this.productsService.delete(id)
  }
}
