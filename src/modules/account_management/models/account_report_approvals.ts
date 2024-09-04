import {
    // Association,
    DataTypes,
    // HasManyAddAssociationMixin,
    // HasManyCountAssociationsMixin,
    // HasManyCreateAssociationMixin,
    // HasManyGetAssociationsMixin,
    // HasManyHasAssociationMixin,
    // HasManySetAssociationsMixin,
    // HasManyAddAssociationsMixin,
    // HasManyHasAssociationsMixin,
    // HasManyRemoveAssociationMixin,
    // HasManyRemoveAssociationsMixin,
    Model,
    // ModelDefined,
    // Optional,
    Sequelize,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from 'sequelize';

const tableName = 'account_report_approvals';
const modelName = 'AccountReportApprovalModel';

type Infer = InferAttributes<DataModel>;
type InferCreation = InferCreationAttributes<DataModel>;
type status = 'active' | 'deactive' | 'block';

class DataModel extends Model<Infer, InferCreation> {
    declare id?: CreationOptional<number>;

    declare approved_by?: string;
    declare date?: number;
    declare openning_balance?: string;
    declare closing_balance?: string;
    declare total_income?: string;
    declare total_expense?: string;
    declare is_approved?: string;
    declare not_approved_comment?: string;
    declare approved_comment?: string;

    declare status?: status;
    declare creator?: number;

    declare created_at?: CreationOptional<Date>;
    declare updated_at?: CreationOptional<Date>;
}

function init(sequelize: Sequelize) {
    DataModel.init(
        {
            id: {
                type: DataTypes.BIGINT().UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            approved_by: {
                type: new DataTypes.BIGINT().UNSIGNED,
                allowNull: true,
            },
            date: {
                type: new DataTypes.DATE,
                allowNull: true,
            },
            openning_balance: {
                type: new DataTypes.FLOAT(),
                allowNull: true,
            },
            closing_balance: {
                type: new DataTypes.FLOAT(),
                allowNull: true,
            },
            total_income: {
                type: new DataTypes.FLOAT(),
                allowNull: true,
            },
            total_expense: {
                type: new DataTypes.FLOAT(),
                allowNull: true,
            },
            is_approved: {
                type: new DataTypes.ENUM('0','1'),
                allowNull: true,
                defaultValue: '1',
            },
            not_approved_comment: {
                type: new DataTypes.TEXT,
                allowNull: true,
            },
            approved_comment: {
                type: new DataTypes.TEXT,
                allowNull: true,
            },
            
            status: {
                type: new DataTypes.ENUM('active', 'deactive', 'block'),
                defaultValue: 'active',
            },
            creator: {
                type: new DataTypes.TINYINT(),
                allowNull: true,
                defaultValue: null,
            },

            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE,
        },
        {
            tableName: tableName,
            modelName: modelName,
            sequelize, // passing the `sequelize` instance is required
            underscored: true,
        },
    );

    return DataModel;
}

export { init, DataModel };
