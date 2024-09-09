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

export const generateUID = function() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Add 1 to month since it's zero-based
    const day = String(now.getDate()).padStart(2, '0');
    const randomNum = Math.floor(Math.random() * 9000) + 1000;
    const uid = `${year}${month}${day}${randomNum}`;
    return uid;
}

/** validation rules */
async function validate(req: Request) {
    let field = '';
    let fields = [
        'account_id',
        'account_number_id',
        'account_category_id',
        'amount',
        'date',
        'expense_description',
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

    field = 'user_id';
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
async function store_expense(
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
    let data = new models.AccountLogModel();

    let user_id = 0;
    try {
        user_id = JSON.parse(body.user_id)[0];
    } catch (err) {
        
    }

    let inputs: InferCreationAttributes<typeof data> = {
        account_id: body.account_id,
        account_number_id: body.account_number_id,
        account_category_id: body.account_category_id,
        user_id: user_id,
        date: body.date,
        amount: body.amount,
        amount_in_text: body.amount_in_text,
        description: body.expense_description,
        type: 'expense',
        uid: generateUID(),
    };

    /** print request data into console */
    // console.clear();
    // (fastify_instance as any).print(inputs);

    /** store data into database */
    try {
        (await data.update(inputs)).save();

        return response(201, 'data created', {
            data,
        });
    } catch (error: any) {
        let uid = await error_trace(models, error, req.url, req.body);
        throw new custom_error('server error', 500, error.message, uid);
        // throw error;
    }
}

export default store_expense;
