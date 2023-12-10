import { DataSource } from 'typeorm';

// @ts-ignore
import * as ormConfig from '../../ormconfig.json';
import { Task } from '../models/task';

const host = ormConfig.host || 'localhost';
const userName = ormConfig.username;
const password = ormConfig.password;
const database = ormConfig.database;
const port = ormConfig.port || '5432';


const appDataSource = new DataSource({
    type: 'postgres',
    host: host,
    port: parseInt(port),
    username: userName,
    password: password,
    database: database,
    synchronize: true,
    logging: true,
    entities: [Task],
    subscribers: [],
    migrations: [],
});

export default appDataSource;