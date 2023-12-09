import winston from 'winston';

const logger = winston.createLogger({
    // Configure the logger options
    // For example, set the log level, format, and transports

    level: process.env.Log_Level,
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'todoApp.log' })
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
    ),
});

export class APILogger {

    info(message: String, data: String) {
        logger.info(`${message}   ${undefined != data ? JSON.stringify(data) : ''}`);
    }

    error(message: String) {
        logger.error(message);
    }
}