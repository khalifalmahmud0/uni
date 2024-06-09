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
    DefaultSetOptions,
    // NonAttribute,
    // ForeignKey,
} from 'sequelize';

const tableName = 'user_informations';
const modelName = 'UserInformationModels';

type Infer = InferAttributes<DataModel>;
type InferCreation = InferCreationAttributes<DataModel>;
type status = 'active' | 'deactive';

class DataModel extends Model<Infer, InferCreation> {
    declare id?: CreationOptional<number>;

    declare user_id: number;
    declare father_name?: string;
    declare mother_name?: string;
    declare husband_spouse?: string;
    declare mobile_no?: string;
    declare nid?: string;
    declare dob?: string;
    declare education?: string;
    declare permanent_address?: string;
    declare present_address?: string;

    declare bank_name?: string;
    declare branch_name?: string;
    declare bank_account_no?: string;
    declare bank_routing_no?: string;
    declare mobile_banking_portal?: string;
    declare mobile_banking_ac_no?: string;

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
            user_id: {
                type: DataTypes.BIGINT.UNSIGNED,
                allowNull: true,
            },
            father_name: {
                type: new DataTypes.STRING(120),
                allowNull: true,
            },
            mother_name: {
                type: new DataTypes.STRING(120),
                allowNull: true,
            },
            husband_spouse: {
                type: new DataTypes.STRING(120),
                allowNull: true,
            },
            nid: {
                type: new DataTypes.STRING(120),
                allowNull: true,
            },
            dob: {
                type: new DataTypes.STRING(120),
                allowNull: true,
            },
            education: {
                type: new DataTypes.STRING(120),
                allowNull: true,
            },
            permanent_address: {
                type: new DataTypes.STRING(120),
                allowNull: true,
            },
            present_address: {
                type: new DataTypes.STRING(120),
                allowNull: true,
            },

            bank_name: {
                type: new DataTypes.STRING(120),
                allowNull: true,
            },
            branch_name: {
                type: new DataTypes.STRING(120),
                allowNull: true,
            },
            bank_account_no: {
                type: new DataTypes.STRING(120),
                allowNull: true,
            },
            bank_routing_no: {
                type: new DataTypes.STRING(120),
                allowNull: true,
            },
            mobile_banking_portal: {
                type: new DataTypes.STRING(120),
                allowNull: true,
            },
            mobile_banking_ac_no: {
                type: new DataTypes.STRING(120),
                allowNull: true,
            },

            status: {
                type: new DataTypes.ENUM('active', 'deactive'),
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
