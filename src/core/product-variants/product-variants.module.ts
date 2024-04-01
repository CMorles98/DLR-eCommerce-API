import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import {
  ProductVariant,
  productVariantSchema,
} from './entities/product-variant.entity'
import { UsersModule } from '../users/users.module'
import { ProductVariantsController } from './product-variants.controller'
import { ProductVariantsService } from './product-variants.service'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule,
    UsersModule,
    MongooseModule.forFeature([
      { name: ProductVariant.name, schema: productVariantSchema },
    ]),
  ],
  controllers: [ProductVariantsController],
  providers: [ProductVariantsService],
})
export class ProductVariantsModule {}
