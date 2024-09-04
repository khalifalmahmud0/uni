"use strict"
import { Sequelize } from 'sequelize';
import { app_config } from '../configs/app.config';
require('dotenv').config();

interface Database {
    [key: string]: any;
}

export interface sequelize_response {
    sequelize: Sequelize | null;
    // db: { [key: string]: Model };
}

export const sequelize = function (): Promise<sequelize_response> {
    return new Promise(async (resolve, reject) => {

        const DBhost = encodeURIComponent(process?.env.DB_HOST || '');
        const DBport = encodeURIComponent(process?.env.DB_PORT || '');
        const DBuser = encodeURIComponent(process?.env.DB_USER || '');
        const DBpass = encodeURIComponent(process?.env.DB_PASSWORD || '');
        const DBdatabase = encodeURIComponent(process?.env.DB_DATABASE || '');

        const sequelize: Sequelize = new Sequelize(app_config.DB_string, {
            // host: DBhost,
            dialect: 'mysql',
            // port: parseInt(DBport),
            dialectOptions: {
                charset: 'utf8mb4',
            },
            define: {
                charset: 'utf8mb4',
                collate: 'utf8mb4_unicode_520_ci',
            },
            pool: {
                max: 10,
                min: 0,
                acquire: 30000,
                idle: 10000,
            },
        });

        try {
            await sequelize.authenticate();
            resolve({
                sequelize: sequelize
            });
            console.log('Database Connection has been established successfully. \n');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
            reject(false);
        }
    })
}
