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

const tableName = 'project_customer_informations';
const modelName = 'ProjectCustomerInformationModel';

type Infer = InferAttributes<DataModel>;
type InferCreation = InferCreationAttributes<DataModel>;
type status = 'active' | 'deactive' | 'block';

class DataModel extends Model<Infer, InferCreation> {
    declare id?: CreationOptional<number>;

    declare project_id?: number;
    declare user_id?: number;
    declare reference_user_id?: number;
    declare project_customer_id?: number;
    declare mo_id: number;
    declare agm_id: number;
    declare gm_id: number;
    declare ed_id: number;

    declare customer_informations?: string;

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
            project_id: {
                type: new DataTypes.BIGINT().UNSIGNED,
                allowNull: true,
            },
            user_id: {
                type: new DataTypes.BIGINT().UNSIGNED,
                allowNull: true,
            },
            reference_user_id: {
                type: new DataTypes.BIGINT().UNSIGNED,
                allowNull: true,
            },
            mo_id: {
                type: new DataTypes.BIGINT().UNSIGNED,
                allowNull: true,
            },
            agm_id: {
                type: new DataTypes.BIGINT().UNSIGNED,
                allowNull: true,
            },
            gm_id: {
                type: new DataTypes.BIGINT().UNSIGNED,
                allowNull: true,
            },
            ed_id: {
                type: new DataTypes.BIGINT().UNSIGNED,
                allowNull: true,
            },
            project_customer_id: {
                type: new DataTypes.BIGINT().UNSIGNED,
                allowNull: true,
            },

            customer_informations: {
                type: DataTypes.JSON,
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
