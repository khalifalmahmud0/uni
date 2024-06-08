import {
    // Model,
    Sequelize,
} from 'sequelize';
import * as user_model from '../../user_management/models/user_model';
require('dotenv').config();

let host = process?.env.DB_HOST || '';
let post = process?.env.DB_PORT || '';
let user = process?.env.DB_USER || '';
let pass = process?.env.DB_PASSWORD || '';
let database = process?.env.DB_DATABASE || '';

const sequelize = new Sequelize(
    `mysql://${user}:${pass}@${host}:${post}/${database}`,
);

interface models {
    User: typeof user_model.DataModel;
    sequelize: Sequelize;
}
const db = async function (): Promise<models> {
    const User = user_model.init(sequelize);
    let force = process.env.DB_FORCE_SYNC;
    await sequelize.sync({ force: force == 'true' ? true : false });
    let models: models = {
        User,
        sequelize,
    };
    return models;
};
export default db;
