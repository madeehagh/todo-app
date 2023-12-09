import { Sequelize } from 'sequelize-typescript'
import { Task } from "../models/task";
import fs from 'fs';

// Load environment variables from .env file
import dotenv from 'dotenv';
const envConfig = dotenv.parse(fs.readFileSync('.env'));

for (const key in envConfig) {
    process.env[key] = envConfig[key];
}

export const connect = () => {
    const userName = process.env.USERNAME;
    const password = process.env.PASSWORD;
    const database = process.env.DATABASE;
    const dialect: any = process.env.DIALECT;

    const operatorsAliases: any = false;

    const sequelize =
        new Sequelize(database, userName, password, {
        dialect,
        operatorsAliases,
        repositoryMode: true,
        pool: {
            max: 10,
            min: 0,
            acquire: 20000,
            idle: 5000
        }
    });

    sequelize.addModels([Task]);

    const db: any = {};
    db.Sequelize = Sequelize;
    db.sequelize = sequelize;

    return db;

}