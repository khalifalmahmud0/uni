import {
    // Model,
    Sequelize,
} from 'sequelize';
import * as user_model from './user_model';
import * as user_information_model from './user_information_model';
import * as project_payment_model from './project_payment';
import * as project_model from './project_model';
import * as user_nominee_model from './user_nominee_model';
import * as project_customer_information_model from './project_customer_information';
import { app_config } from '../../../../configs/app.config';
// import * as project_model from '../../user_admin copy/models/project_model';
require('dotenv').config();

// const host = encodeURIComponent(process?.env.DB_HOST || '');
// const port = encodeURIComponent(process?.env.DB_PORT || '');
// const user = encodeURIComponent(process?.env.DB_USER || '');
// const pass = encodeURIComponent(process?.env.DB_PASSWORD || '');
// const database = encodeURIComponent(process?.env.DB_DATABASE || '');
// const db_string = `mysql://${user}:${pass}@${host}:${port}/${database}`;

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
    UserModel: typeof user_model.DataModel;
    UserInformationModel: typeof user_information_model.DataModel;
    ProjectModel: typeof project_model.DataModel;
    UserProjectPaymentModel: typeof project_payment_model.DataModel;
    UserNomineeModel: typeof user_nominee_model.DataModel;
    UserProjectCustomerInformationModel: typeof project_customer_information_model.DataModel;
    // Project: typeof project_model.DataModel;
    sequelize: Sequelize;
}
const db = async function (): Promise<models> {
    const UserModel = user_model.init(sequelize);
    const ProjectModel = project_model.init(sequelize);
    const UserInformationModel = user_information_model.init(sequelize);
    const UserProjectPaymentModel = project_payment_model.init(sequelize);
    const UserNomineeModel = user_nominee_model.init(sequelize);
    const UserProjectCustomerInformationModel = project_customer_information_model.init(sequelize);
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
  
    UserModel.belongsTo(UserModel, {
        foreignKey: 'mo',
        targetKey: 'id',
        as: 'mo_info',
    });

    UserModel.belongsTo(UserModel, {
        foreignKey: 'gm',
        targetKey: 'id',
        as: 'gm_info',
    });
  
    UserModel.belongsTo(UserModel, {
        foreignKey: 'agm',
        targetKey: 'id',
        as: 'agm_info',
    });
  
    UserModel.belongsTo(UserModel, {
        foreignKey: 'ed',
        targetKey: 'id',
        as: 'ed_info',
    });
  
    
    UserModel.hasMany(UserNomineeModel, {
        foreignKey: 'user_id',
        as: 'nominee_infos',
    });

    UserModel.hasMany(UserModel, {
        foreignKey: 'ed',
        as: 'eds',
    });
    UserModel.hasMany(UserModel, {
        foreignKey: 'gm',
        as: 'gms',
    });
    UserModel.hasMany(UserModel, {
        foreignKey: 'agm',
        as: 'agms',
    });
    UserModel.hasMany(UserModel, {
        foreignKey: 'mo',
        as: 'mos',
    });

    /** user projec information */
    UserModel.hasOne(UserProjectCustomerInformationModel, {
        foreignKey: 'user_id',
        sourceKey: 'id',
        as: 'project_customer_information',
    });

    UserProjectCustomerInformationModel.belongsTo(ProjectModel, {
        foreignKey: "project_id",
        targetKey: "id",
        as: "project_info"
    })
    
    UserModel.hasMany(UserProjectPaymentModel, {
        foreignKey: 'user_id',
        sourceKey: 'id',
        as: 'project_payments',
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
        UserNomineeModel,
        UserProjectCustomerInformationModel,
        UserProjectPaymentModel,
        ProjectModel,
        // Project,

        sequelize,
    };
    return models;
};
export default db;
