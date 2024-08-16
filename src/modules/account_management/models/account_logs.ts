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
                type: DataTypes.BIGINT.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            account_id: {
                type: new DataTypes.BIGINT.UNSIGNED,
                allowNull: true,
            },
            account_number_id: {
                type: new DataTypes.BIGINT.UNSIGNED,
                allowNull: true,
            },
            user_id: {
                type: new DataTypes.BIGINT.UNSIGNED,
                allowNull: true,
            },
            account_category_id: {
                type: new DataTypes.BIGINT.UNSIGNED,
                defaultValue: 'active',
            },
            
            uid: {
                type: new DataTypes.STRING(50),
                defaultValue: 'active',
            },
            
            date: {
                type: new DataTypes.DATE,
                defaultValue: 'active',
            },
            amount: {
                type: new DataTypes.FLOAT.UNSIGNED,
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
