import winston, { createLogger, format, transports } from 'winston';

// Read the log level from process.env
const logLevel = process.env.LOG_LEVEL || 'info';

// Create a logger instance
const logger = createLogger({
    level: logLevel, // Set the log level
    format: format.combine(
        format.timestamp(), // Add a timestamp to the log message
        format.printf(({ level, message, timestamp }) => {
            return `${timestamp} [${level.toUpperCase()}]: ${message}`;
        })
    ),
    transports: [
        new transports.Console() // Output the log to the console
    ]
});

export class APILogger {

    info(message: String, data: String) {
        logger.info(`${message}   ${undefined != data ? JSON.stringify(data) : ''}`);
    }

    error(message: String) {
        logger.error(message);
    }
}