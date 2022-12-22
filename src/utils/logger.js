import { createLogger, format, transports } from 'winston';

const { combine, timestamp, json, metadata } = format;

const logger = createLogger({
  transports: [
    new transports.Console({
      level: 'debug',
      handleExceptions: true,
      format: combine(metadata(), timestamp(), json()),
    }),
  ],
});

export default logger;
