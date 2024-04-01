import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { configureSwaggerUI } from './common/configurations/configure-swagger'
import { configurePipes } from './common/configurations/configure-pipes'
import { configureApiVersion } from './common/configurations/configure-versioning'
import * as bodyParser from 'body-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors()

  app.use(bodyParser.json({ limit: '50mb' }))

  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

  configurePipes(app)

  configureApiVersion(app)

  configureSwaggerUI(app)

  await app.listen(3000)
}
bootstrap()
