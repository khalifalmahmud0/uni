import {
    // Model,
    Sequelize,
} from 'sequelize';
import * as user_model from './user_model';
import * as user_information_model from './user_information_model';
// import * as project_model from '../../user_admin copy/models/project_model';
require('dotenv').config();

let host = process?.env.DB_HOST || '';
let port = process?.env.DB_PORT || '';
let user = process?.env.DB_USER || '';
let pass = process?.env.DB_PASSWORD || '';
let database = process?.env.DB_DATABASE || '';
let db_string = `mysql://${user}:${pass}@${host}:${port}/${database}`;

const sequelize = new Sequelize(db_string, {
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
    UserModel: typeof user_model.DataModel;
    UserInformationModel: typeof user_information_model.DataModel;
    // Project: typeof project_model.DataModel;
    sequelize: Sequelize;
}
const db = async function (): Promise<models> {
    const UserModel = user_model.init(sequelize);
    const UserInformationModel = user_information_model.init(sequelize);
    // const Project = project_model.init(sequelize);

    await sequelize.sync();

    UserModel.belongsTo(UserInformationModel, {
        foreignKey: 'id',
        targetKey: 'user_id',
        as: 'info',
    });

    UserModel.belongsTo(UserModel, {
        foreignKey: 'reference',
        targetKey: 'id',
        as: 'reference_info',
    });

    // User.hasMany(Project, {
    //     sourceKey: 'id',
    //     foreignKey: 'user_id',
    //     as: 'projects',
    // });

    // User.hasOne(Project, {
    //     sourceKey: 'id',
    //     foreignKey: 'user_id',
    //     as: 'project',
    // });

    // Project.belongsToMany(User, {
    //     through: 'project_user',
    // });
    // User.belongsToMany(Project, {
    //     through: 'project_user',
    // });

    let models: models = {
        UserModel,
        UserInformationModel,
        // Project,

        sequelize,
    };
    return models;
};
export default db;
