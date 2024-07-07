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

const tableName = 'users';
const modelName = 'UserModels';

type Infer = InferAttributes<DataModel>;
type InferCreation = InferCreationAttributes<DataModel>;
type status = 'active' | 'deactive' | 'block';
type role = 'super_admin' | 'admin' | 'accountant' | 'marketing' | 'staff' | 'management' | 'customer' | 'hrm';
type designation = 'ed' | 'gm' | 'agm' | 'mo';

class DataModel extends Model<Infer, InferCreation> {
    declare id?: CreationOptional<number>;
    declare uid: string;
    declare name: string;
    declare role?: role;

    declare designation?: designation;
    declare reference?: number;
    declare mo?: number;
    declare agm?: number;
    declare gm?: number;
    declare ed?: number;

    declare email: string | null;
    declare phone_number?: string | null;
    declare image?: string | null;

    declare password?: string;
    declare token?: string | null;
    declare forget_code?: string | null;
    declare user_agent?: string | null;

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
            uid: {
                type: new DataTypes.STRING(20),
                allowNull: true,
            },
            reference: {
                type: DataTypes.BIGINT.UNSIGNED,
                allowNull: true,
            },
            mo: {
                type: DataTypes.BIGINT.UNSIGNED,
                allowNull: true,
            },
            agm: {
                type: DataTypes.BIGINT.UNSIGNED,
                allowNull: true,
            },
            gm: {
                type: DataTypes.BIGINT.UNSIGNED,
                allowNull: true,
            },
            ed: {
                type: DataTypes.BIGINT.UNSIGNED,
                allowNull: true,
            },
            role: {
                type: new DataTypes.ENUM(
                    'super_admin',
                    'admin',
                    'accountant',
                    'marketing',
                    'staff',
                    'management',
                    'hrm',
                    'customer',
                ),
                defaultValue: 'customer',
            },
            designation: {
                type: new DataTypes.ENUM('ed', 'gm', 'agm', 'mo'),
                allowNull: true,
            },
            name: {
                type: new DataTypes.STRING(120),
                allowNull: true,
            },
            email: {
                type: new DataTypes.STRING(120),
                allowNull: true,
            },
            phone_number: {
                type: new DataTypes.STRING(20),
                allowNull: true,
            },
            image: {
                type: new DataTypes.STRING(120),
                allowNull: true,
            },
            password: {
                type: new DataTypes.STRING(100),
                allowNull: true,
            },
            token: {
                type: new DataTypes.STRING(100),
                allowNull: true,
            },
            forget_code: {
                type: new DataTypes.STRING(10),
                allowNull: true,
            },
            user_agent: {
                type: new DataTypes.STRING(150),
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
