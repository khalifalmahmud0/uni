import {
    // Model,
    Sequelize,
} from 'sequelize';
import * as project_model from './project_model';
import * as project_customer_model from './project_customer';
import * as project_customer_information_model from './project_customer_information';
import * as project_payment_model from './project_payment';
import * as user_model from './user_model';
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
    ProjectModel: typeof project_model.DataModel;
    ProjectCustomerModel: typeof project_customer_model.DataModel;
    ProjectCustomerInfomationModel: typeof project_customer_information_model.DataModel;
    ProjectPaymentModel: typeof project_payment_model.DataModel;
    UserModels: typeof user_model.DataModel;
    // Project: typeof project_model.DataModel;
    sequelize: Sequelize;
}
const db = async function (): Promise<models> {
    const ProjectModel = project_model.init(sequelize);
    const ProjectCustomerModel = project_customer_model.init(sequelize);
    const ProjectCustomerInfomationModel = project_customer_information_model.init(sequelize);
    const ProjectPaymentModel = project_payment_model.init(sequelize);
    const UserModels = user_model.init(sequelize);
    // const Project = project_model.init(sequelize);

    await sequelize.sync();

    // UserModels.hasMany(ProjectCustomerModel,{
    //     foreignKey: 'user_id',
    //     as: 'projects',
    // });

    ProjectCustomerModel.belongsTo(ProjectModel,{
        foreignKey: 'project_id',
        as: 'project'
    });
    ProjectCustomerModel.belongsTo(UserModels,{
        foreignKey: 'user_id',
        as: 'customer'
    });
    ProjectCustomerModel.hasOne(ProjectCustomerInfomationModel,{
        foreignKey: 'project_customer_id',
        as: 'details'
    });
    
    ProjectCustomerModel.belongsTo(UserModels,{
        foreignKey: 'user_id',
        as: 'reference'
    });
    ProjectCustomerModel.belongsTo(UserModels,{
        foreignKey: 'ed_id',
        as: 'ed'
    });
    ProjectCustomerModel.belongsTo(UserModels,{
        foreignKey: 'gm_id',
        as: 'gm'
    });
    ProjectCustomerModel.belongsTo(UserModels,{
        foreignKey: 'agm_id',
        as: 'agm'
    });
    ProjectCustomerModel.belongsTo(UserModels,{
        foreignKey: 'mo_id',
        as: 'mo',
    });

    UserModels.belongsTo(UserModels, {
        foreignKey: 'agm',
        targetKey: 'id',
        as: 'agm_info',
    });
    UserModels.belongsTo(UserModels, {
        foreignKey: 'gm',
        targetKey: 'id',
        as: 'gm_info',
    });
    UserModels.belongsTo(UserModels, {
        foreignKey: 'ed',
        targetKey: 'id',
        as: 'ed_info',
    });

    /** project payment model relations */
    ProjectPaymentModel.belongsTo(UserModels, {
        foreignKey: 'user_id',
        targetKey: 'id',
        as: 'user_info',
    });
    ProjectPaymentModel.belongsTo(UserModels, {
        foreignKey: 'reference_user_id',
        targetKey: 'id',
        as: 'reference_info',
    });
    ProjectPaymentModel.belongsTo(ProjectModel, {
        foreignKey: 'project_id',
        targetKey: 'id',
        as: 'project_info',
    });

    UserModels.hasOne(ProjectCustomerInfomationModel, {
        foreignKey: 'user_id',
        sourceKey: 'id',
        as: 'project_customer_information',
    });

    // Project.belongsToMany(User, {
    //     through: 'project_user',
    // });
    // User.belongsToMany(Project, {
    //     through: 'project_user',
    // });

    let models: models = {
        ProjectModel,
        ProjectCustomerModel,
        ProjectCustomerInfomationModel,
        ProjectPaymentModel,
        UserModels,
        // Project,

        sequelize,
    };
    return models;
};
export default db;
