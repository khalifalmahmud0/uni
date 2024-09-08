import {
    // Model,
    Sequelize,
} from 'sequelize';
import * as user_model from './user_model';
import * as account_logs_model from './account_logs';
import * as account_numbers_model from './account_numbers';
import * as account_report_approval_docs_model from './account_report_approval_docs';
import * as account_report_approvals_model from './account_report_approvals';
import * as accounts_model from './accounts';
import * as account_category_model from './account_categories';
import * as account_user_sales_insentive_model from './account_user_sales_insentive';
import * as account_user_sales_insentive_calculation_model from './account_user_sales_insentive_calculation';
import { app_config } from '../../../configs/app.config';
require('dotenv').config();

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
    AccountLogModel: typeof account_logs_model.DataModel;
    AccountNumberModel: typeof account_numbers_model.DataModel;
    AccountReportApprovalDocModel: typeof account_report_approval_docs_model.DataModel;
    AccountReportApprovalModel: typeof account_report_approvals_model.DataModel;
    AccountModel: typeof accounts_model.DataModel;
    AccountCategoryModel: typeof account_category_model.DataModel;
    AccountUserSalesInsentiveModel: typeof account_user_sales_insentive_model.DataModel;
    AccountUserSalesInsentiveCalculationModel: typeof account_user_sales_insentive_calculation_model.DataModel;
    // Project: typeof project_model.DataModel;
    sequelize: Sequelize;
}
const db = async function (): Promise<models> {
    const UserModel = user_model.init(sequelize);
    const AccountLogModel = account_logs_model.init(sequelize);
    const AccountNumberModel = account_numbers_model.init(sequelize);
    const AccountReportApprovalDocModel = account_report_approval_docs_model.init(sequelize);
    const AccountReportApprovalModel = account_report_approvals_model.init(sequelize);
    const AccountModel = accounts_model.init(sequelize);
    const AccountCategoryModel = account_category_model.init(sequelize);
    const AccountUserSalesInsentiveModel = account_user_sales_insentive_model.init(sequelize);
    const AccountUserSalesInsentiveCalculationModel = account_user_sales_insentive_calculation_model.init(sequelize);

    await sequelize.sync();

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
        AccountLogModel,
        AccountNumberModel,
        AccountReportApprovalDocModel,
        AccountReportApprovalModel,
        AccountModel,
        AccountCategoryModel,
        AccountUserSalesInsentiveModel,
        AccountUserSalesInsentiveCalculationModel,
        // Project,
        sequelize,
    };
    return models;
};
export default db;
