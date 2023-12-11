import 'reflect-metadata';
import { createServer } from 'http';

import App from './app';
import { APILogger } from './logger/api.logger';

const port = process.env.PORT || 4000;

App.set('port', port);
const server = createServer(App);
server.listen(port);

const logger = new APILogger();

server.on('listening', (): void => {
    const addr = server.address();
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
    logger.info(`Listening on ${bind}`, null);
});

export = App;