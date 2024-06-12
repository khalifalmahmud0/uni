import db from '../models/db';
import fastify, { FastifyInstance, FastifyRequest } from 'fastify';
import { body, validationResult } from 'express-validator';
import {
    anyObject,
    responseObject,
    Request,
} from '../../../../common_types/object';
import response from '../helpers/response';
import { InferCreationAttributes } from 'sequelize';
import custom_error from '../helpers/custom_error';
import error_trace from '../helpers/error_trace';
import moment from 'moment';

/** validation rules */
async function validate(req: Request) {
    let field = '';
    let fields = [
        'name',
        'email',
        'father_name',
        'mother_name',
        'husband_spouse',
        'phone_number',
        'nid',
        'education',
        'permanent_address',
        'present_address',
        'reference',
        'password',

        'bank_name',
        'branch_name',
        'bank_account_no',
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

    field = 'reference';
    await body(field)
        .not()
        .isEmpty()
        .custom(async (value) => {
            const length = value.length;
            if (length <= 2) {
                throw new Error(
                    `the <b>${field.replaceAll('_', ' ')}</b> field is required`,
                );
            }
        })
        .withMessage(
            `the <b>${field.replaceAll('_', ' ')}</b> field is required`,
        )
        .run(req);

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
    let data = new models.Kh_Category_Model();
    let user_information = new models.Kh_Category_Model();
    const bcrypt = require('bcrypt');
    const saltRounds = 10;
    let password = await bcrypt.hash(body.password, saltRounds);

    let image_path =
        'uploads/users/' +
        moment().format('YYYYMMDDHHmmss') +
        body['image'].ext;
    await (fastify_instance as any).upload(body['image'], image_path);

    let reference = JSON.parse(body.reference)[0];

    let inputs: InferCreationAttributes<typeof data> = {
        name: body.name,
        email: body.email,
        subject: body.subject,
        description: body.description,
    };

    /** print request data into console */
    console.clear();
    // (fastify_instance as any).print(inputs);

    /** store data into database */
    try {
        (await data.update(inputs)).save();

        return response(201, 'data created', data);
    } catch (error: any) {
        let uid = await error_trace(models, error, req.url, req.body);
        throw new custom_error('server error', 500, error.message, uid);
    }
}

export default store;
