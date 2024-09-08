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

const tableName = 'account_logs';
const modelName = 'AccountLogModel';

type Infer = InferAttributes<DataModel>;
type InferCreation = InferCreationAttributes<DataModel>;
type status = 'active' | 'deactive' | 'block';
type transaction_type = 'income' | 'expense';

class DataModel extends Model<Infer, InferCreation> {
    declare id?: CreationOptional<number>;

    declare account_id?: number;
    declare account_number_id?: number;
    declare uid?: string;
    declare account_category_id?: number;
    declare user_id?: number;

    declare date?: string;
    declare amount?: number;
    declare type?: transaction_type;

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
            account_id: {
                type: new DataTypes.BIGINT().UNSIGNED,
                allowNull: true,
            },
            account_number_id: {
                type: new DataTypes.BIGINT().UNSIGNED,
                allowNull: true,
            },
            user_id: {
                type: new DataTypes.BIGINT().UNSIGNED,
                allowNull: true,
            },
            account_category_id: {
                type: new DataTypes.BIGINT().UNSIGNED,
                allowNull: true,
            },
            
            uid: {
                type: new DataTypes.STRING(50),
                allowNull: true,
            },
            
            date: {
                type: new DataTypes.DATE,
                allowNull: true,
            },
            amount: {
                type: new DataTypes.FLOAT().UNSIGNED,
                allowNull: true,
            },
            type: {
                type: new DataTypes.ENUM('income','expense'),
                defaultValue: 'income',
            },

            creator: {
                type: new DataTypes.TINYINT(),
                allowNull: true,
                defaultValue: null,
            },

            status: {
                type: new DataTypes.ENUM('active', 'deactive', 'block'),
                defaultValue: 'active',
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
