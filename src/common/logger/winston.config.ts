import * as winston from 'winston'
import 'winston-daily-rotate-file'
import * as winstonMongoDB from 'winston-mongodb'

const transports = (connectionString: string) => {
  return [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize(),
        winston.format.printf(
          ({ timestamp, level, message, context, trace }) => {
            return `${timestamp} [${context}] ${level}: ${message}${trace ? `\n${trace}` : ''}`
          },
        ),
      ),
    }),
    new winston.transports.DailyRotateFile({
      filename: 'logs/dlr-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
    }),
    new winstonMongoDB.MongoDB({
      level: 'info',
      db: connectionString,
      options: {
        useUnifiedTopology: true,
      },
      collection: 'logs',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
      dbName: 'DLR',
    }),
  ]
}

export const logger = (connectionString: string) => {
  return winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: transports(connectionString),
    handleExceptions: true,
  })
}
