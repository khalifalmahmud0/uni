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

const tableName = 'projects';
const modelName = 'ProjectModel';

type Infer = InferAttributes<DataModel>;
type InferCreation = InferCreationAttributes<DataModel>;
type status = 'active' | 'deactive' | 'block';

class DataModel extends Model<Infer, InferCreation> {
    declare id?: CreationOptional<number>;

    declare uid: string;
    declare title: string;

    declare description?: string;
    declare location?: string;
    declare map?: string;
    declare aveneue?: string;
    declare plot?: string;
    declare road?: string;

    declare per_share_cost?: number;

    declare video?: string;
    declare image?: string;

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
            title: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            video: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            image: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },
            location: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            map: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            aveneue: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            plot: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            road: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            per_share_cost: {
                type: DataTypes.DOUBLE,
                allowNull: true,
            },
          
            description: {
                type: DataTypes.TEXT,
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
