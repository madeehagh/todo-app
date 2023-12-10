import fs from 'fs';
import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';

import { initTaskModel } from '../models/task';
import { APILogger } from '../logger/api.logger';

// Load environment variables from .env file
const envConfig = dotenv.parse(fs.readFileSync('.env'));
const logger: APILogger = new APILogger();

for (const key in envConfig) {
    process.env[key] = envConfig[key];
}

let db: any = null; // Variable to store the database connection

export const connect = async () => {
    if (db) {
        return db;
    }
    const host = process.env.HOST || '0.0.0.0';
    const userName = process.env.USERNAME;
    const password = process.env.PASSWORD;
    const database = process.env.DATABASE;
    const dialect: any = process.env.DIALECT;

    const sequelize = new Sequelize(database, userName, password, {
        host,
        dialect,
        repositoryMode: true,
        pool: {
            max: 10,
            min: 0,
            idle: 5000,
        },
        storage: '../data/database.sqlite',
        logging: false,
    });

    initTaskModel(sequelize); // Initialize the Task model

    try {
        await sequelize.authenticate();
        logger.info('Connection established.', {});

        await sequelize.sync({ alter: true }); // Creates or alters the table based on the model definition

        db = {
            Sequelize,
            sequelize,
        };

        return db;
    } catch (error) {
        logger.error('Unable to connect to the database:', error);
        throw error;
    }
};