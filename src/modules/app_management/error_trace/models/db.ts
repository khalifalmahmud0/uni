import {
    // Model,
    Sequelize,
} from 'sequelize';
import * as error_traces_model from './error_traces_model';
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

console.log('loading error trace management');

interface models {
    ErrorTraceModel: typeof error_traces_model.DataModel;
    sequelize: Sequelize;
}
const db = async function (): Promise<models> {
    const ErrorTraceModel = error_traces_model.init(sequelize);

    let force = process.env.DB_FORCE_SYNC;
    await sequelize.sync({ force: force == 'true' ? true : false });

    let models: models = {
        ErrorTraceModel,

        sequelize,
    };
    return models;
};
export default db;
