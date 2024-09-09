import {
    // Model,
    Sequelize,
} from 'sequelize';
import * as user_model from '../../user_management/models/user_model';
import { app_config } from '../../../../configs/app.config';
require('dotenv').config();

// let host = process?.env.DB_HOST || '';
// let post = process?.env.DB_PORT || '';
// let user = process?.env.DB_USER || '';
// let pass = process?.env.DB_PASSWORD || '';
// let database = process?.env.DB_DATABASE || '';

const sequelize = new Sequelize(app_config.DB_string, {
    logging: false,
    dialectOptions: {
        charset: 'utf8mb4',
    },
    define: {
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_520_ci',
    },
});

interface models {
    User: typeof user_model.DataModel;
    sequelize: Sequelize;
}
const db = async function (): Promise<models> {
    const User = user_model.init(sequelize);
    let force = process.env.DB_FORCE_SYNC;
    // await sequelize.sync({ force: force == 'true' ? true : false });
    let models: models = {
        User,
        sequelize,
    };
    return models;
};
export default db;
