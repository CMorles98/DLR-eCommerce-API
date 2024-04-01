import { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AuthModule } from 'src/core/auth/auth.module'
import { CategoriesModule } from 'src/core/categories/categories.module'
import { ProductVariantsModule } from 'src/core/product-variants/product-variants.module'
import { ProductsModule } from 'src/core/products/products.module'
import { UsersModule } from 'src/core/users/users.module'

export const configureSwaggerUI = (app: INestApplication<any>) => {
  const config = new DocumentBuilder()
    .setTitle('DLR Api')
    .setDescription('DLR Tech')
    .setVersion('1.0')
    .addTag('auth')
    .addTag('users')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config, {
    include: [
      AuthModule,
      CategoriesModule,
      UsersModule,
      ProductVariantsModule,
      ProductsModule,
    ],
  })

  SwaggerModule.setup('swagger-ui', app, document)
}
