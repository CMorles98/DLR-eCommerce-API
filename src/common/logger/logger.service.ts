import { Injectable } from '@nestjs/common'
import { logger } from './winston.config'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class LoggerService {
  constructor(private readonly configService: ConfigService) {}

  private connectionString = this.configService.getOrThrow('MONGO_URL')

  log(message: string, context?: string) {
    logger(this.connectionString).info(message, { context })
  }

  error(message: string, trace: string, context?: string) {
    logger(this.connectionString).error(message, { context, trace })
  }

  warn(message: string, context?: string) {
    logger(this.connectionString).warn(message, { context })
  }

  debug(message: string, context?: string) {
    logger(this.connectionString).debug(message, { context })
  }
}
