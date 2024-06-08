import {
    // Model,
    Sequelize,
} from 'sequelize';
import * as setting_model from './setting_model';
// import * as project_model from '../../user_admin copy/models/project_model';
require('dotenv').config();

let host = process?.env.DB_HOST || '';
let post = process?.env.DB_PORT || '';
let user = process?.env.DB_USER || '';
let pass = process?.env.DB_PASSWORD || '';
let database = process?.env.DB_DATABASE || '';

const sequelize = new Sequelize(
    `mysql://${user}:${pass}@${host}:${post}/${database}`,
    {
        logging: false,
    },
);

console.log('loading setting management');

interface models {
    SettingModel: typeof setting_model.DataModel;
    sequelize: Sequelize;
}
const db = async function (): Promise<models> {
    const SettingModel = setting_model.init(sequelize);
    // const Project = project_model.init(sequelize);

    let force = process.env.DB_FORCE_SYNC;
    await sequelize.sync({ force: force == 'true' ? true : false });

    let models: models = {
        SettingModel,

        sequelize,
    };
    return models;
};
export default db;
