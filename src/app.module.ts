import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core'
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UsersModule } from './core/users/users.module'
import { LoggerModule } from './common/logger/logger.module'
import { GlobalExceptionFilter } from './common/filters/global-exception.filter'
import { LoggerService } from './common/logger/logger.service'
import { AuthModule } from './core/auth/auth.module'
import { CategoriesModule } from './core/categories/categories.module'
import { configModuleConfigurations } from './common/configurations/configure-config-module'
import { ProductVariantsModule } from './core/product-variants/product-variants.module'
import { ProductsModule } from './core/products/products.module'
import { CommonModule } from './common/common.module'

@Module({
  imports: [
    configModuleConfigurations,
    CacheModule.register({ max: 10, isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URL, {
      dbName: process.env.MONGO_DB_NAME,
    }),
    AuthModule,
    UsersModule,
    LoggerModule,
    CategoriesModule,
    ProductVariantsModule,
    ProductsModule,
    CommonModule,
  ],
  providers: [
    LoggerService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
