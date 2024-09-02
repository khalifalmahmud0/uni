import db from '../models/db';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { body, validationResult } from 'express-validator';
import {
    anyObject,
    responseObject,
    Request,
} from '../../../common_types/object';
import response from '../helpers/response';
import { InferCreationAttributes } from 'sequelize';
import custom_error from '../helpers/custom_error';
import error_trace from '../helpers/error_trace';
import moment from 'moment';

/** validation rules */
async function validate(req: Request) {
    let field:string[] = [];
    let fields = [
        'booking_type',
        'customer_id',
        'customer_password',
        'applicant_name_english',
        'application_date',
        'mobile',
    ];

    for (let index = 0; index < fields.length; index++) {
        const field = fields[index];
        await body(field)
            .not()
            .isEmpty()
            .withMessage(
                `the <b>${field.replaceAll('_', ' ')}</b> field is required`,
            )
            .run(req);
    }

    field = ['project_id', 'reference_user_id'];
    for (let index = 0; index < field.length; index++) {
        const element = field[index];
        await body(element)
            .not()
            .isEmpty()
            .custom(async (value) => {
                const length = value.length;
                if (length <= 2) {
                    throw new Error(
                        `the <b>${element.replaceAll('_', ' ')}</b> field is required`,
                    );
                }
            })
            .withMessage(
                `the <b>${element.replaceAll('_', ' ')}</b> field is required`,
            )
            .run(req);
    }

    let result = await validationResult(req);

    return result;
}
// async function store(
//     fastify_instance: FastifyInstance,
//     req: FastifyRequest,
// ): Promise<responseObject> {
//     throw new Error('500 test');
// }
async function store(
    fastify_instance: FastifyInstance,
    req: FastifyRequest,
): Promise<responseObject> {
    /** validation */
    let validate_result = await validate(req as Request);
    if (!validate_result.isEmpty()) {
        return response(422, 'validation error', validate_result.array());
    }

    /** initializations */
    let models = await db();
    let body = req.body as anyObject;
    let user_model = new models.UserModels();
    let data = new models.ProjectCustomerModel();
    let project_customer_info = new models.ProjectCustomerInfomationModel();

    let image_path = "";
    let nominee_photo_1 = "";
    let nominee_photo_2 = "";

    if(body['customer_image']?.ext){
        image_path =
            'uploads/projects/' +
            moment().format('YYYYMMDDHHmmss') +
            body['customer_image'].ext;
        await (fastify_instance as any).upload(body['customer_image'], image_path);
    }
    
    if(body['nominee_photo_1']?.ext){
        image_path =
            'uploads/projects/' +
            moment().format('YYYYMMDDHHmmss') +
            body['nominee_photo_1'].ext;
        await (fastify_instance as any).upload(body['nominee_photo_1'], image_path);
    }
    
    if(body['nominee_photo_2']?.ext){
        image_path =
            'uploads/projects/' +
            moment().format('YYYYMMDDHHmmss') +
            body['nominee_photo_2'].ext;
        await (fastify_instance as any).upload(body['nominee_photo_2'], image_path);
    }

    const bcrypt = require('bcrypt');
    const saltRounds = 10;
    let password = await bcrypt.hash(body.customer_password, saltRounds);
    
    let user_inputs: InferCreationAttributes<typeof user_model> = {
        name: body.applicant_name_english,
        email: body.email,
        phone_number: body.mobile,
        password: password,
        image: image_path,
    };

    let project_id = null;
    let reference_user_id = null;
    if(body.project_id){
        project_id = JSON.parse(body.project_id)[0];
    }
    if(body.reference_user_id){
        reference_user_id = JSON.parse(body.reference_user_id)[0];
    }

    let inputs: InferCreationAttributes<typeof data> = {
        project_id: project_id,
        reference_user_id: reference_user_id,
        user_id: 0,
        have_to_pay_amount: 0,
        date: body.application_date,
        paid: 0,
        total_share: 0,
    };

    let keysToRemove = [
        'project_id', 'reference_user_id', 'customer_image',
        'nominee_photo_1', 'nominee_photo_2',
    ];

    let obj = body;
    let project_customer_info_inputs: anyObject = {
        customer_informations: {
            nominee_photo_1: '',
            nominee_photo_2: '',
        },
    };
    project_customer_info_inputs.customer_informations = Object.keys(obj).reduce((acc:anyObject, key) => {
        if (!keysToRemove.includes(key)) {
            acc[key] = obj[key];
        }
        return acc;
    }, {});
    project_customer_info_inputs.customer_informations.nominee_photo_1 = nominee_photo_1;
    project_customer_info_inputs.customer_informations.nominee_photo_2 = nominee_photo_2;

    /** print request data into console */
    // console.clear();
    // (fastify_instance as any).print(inputs);

    /** store data into database */
    try {
        (await user_model.update(user_inputs)).save();

        if(user_model.id){
            inputs.user_id = user_model.id;
        }
        (await data.update(inputs)).save();

        if(data.id){
            project_customer_info_inputs.project_id = data.project_id;
            project_customer_info_inputs.user_id = data.user_id;
            project_customer_info_inputs.reference_user_id = data.reference_user_id;
            project_customer_info_inputs.project_customer_id = data.id;
            // project_customer_info_inputs.customer_informations = 
            //     JSON.stringify(project_customer_info_inputs.customer_informations);

            (await project_customer_info.update(project_customer_info_inputs)).save();
        }

        return response(201, 'data created', {
            data,
        });
    } catch (error: any) {
        let uid = await error_trace(models, error, req.url, req.body);
        throw new custom_error('server error', 500, error.message, uid);
        // throw error;
    }
}

export default store;
