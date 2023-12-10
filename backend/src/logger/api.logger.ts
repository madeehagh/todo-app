import  { createLogger, format, transports } from 'winston';

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

    public info(message: string, data) {
        logger.info(`${message}   ${undefined != data ? JSON.stringify(data) : ''}`);
    }

    public error(message: string, error: Error) {
        const stackTrace = error.stack?.split('\n');
        const errorLine = stackTrace && stackTrace.length > 1 ? stackTrace[1] : '';
        const errorLocation = errorLine.match(/\((.*):\d+:\d+\)$/);
        const fileName = errorLocation ? errorLocation[1] : '';

        console.error(`[ERROR] ${message}`);
        console.error(`Error thrown from file: ${fileName}`);
        console.error(error);
    }

    warn(recordNotFound: string) {
        console.warn(recordNotFound);
    }
}