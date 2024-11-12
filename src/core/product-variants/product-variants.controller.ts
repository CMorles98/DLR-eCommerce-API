import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'
import { AuthGuard } from '../../common/guards/auth.guard'
import { ProductVariantsService } from './product-variants.service'

@UseGuards(AuthGuard)
@ApiTags('product-variants')
@ApiBearerAuth()
@Controller('api/v1/product-variants')
export class ProductVariantsController {
  constructor(private readonly productVariantService: ProductVariantsService) {}

  @Get()
  async findAll() {
    return await this.productVariantService.find()
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.productVariantService.findOne({
      _id: id,
    })
  }
}
