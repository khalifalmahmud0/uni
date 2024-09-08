import { FindAndCountOptions, Sequelize } from 'sequelize';
import db from '../../models/db';
import { FastifyInstance, FastifyRequest } from 'fastify';
import response from '../../helpers/response';
import error_trace from '../../helpers/error_trace';
import custom_error from '../../helpers/custom_error';
import { validationResult, query } from 'express-validator';
import {
    anyObject,
    responseObject,
    Request,
} from '../../../../common_types/object';

/** validation rules */
async function validate(req: Request) {
    await query('orderByCol')
        .not()
        .isEmpty()
        .withMessage('the orderByCol field is required')
        .run(req);

    await query('orderByAsc')
        .not()
        .isEmpty()
        .withMessage('the orderByAsc field is required')
        .run(req);

    await query('show_active_data')
        .not()
        .isEmpty()
        .withMessage('the show_active_data field is required')
        .run(req);

    await query('paginate')
        .not()
        .isEmpty()
        .withMessage('the paginate field is required')
        .run(req);

    let result = await validationResult(req);

    return result;
}

async function all(
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
    let query_param = req.query as any;

    const { Op } = require('sequelize');
    let search_key = query_param.search_key;
    let orderByCol = query_param.orderByCol || 'id';
    let role = query_param.role || null;
    let orderByAsc = query_param.orderByAsc || 'true';
    let show_active_data = query_param.show_active_data || 'true';
    let paginate = parseInt((req.query as any).paginate) || 10;
    let select_fields: string[] = [];
    let exclude_fields: string[] = ['password'];

    if (query_param.select_fields) {
        select_fields = query_param.select_fields.replace(/\s/g, '').split(',');
        select_fields = [...select_fields, 'id', 'status'];
    } else {
        select_fields = ['id', 'title', 'description', 'location', 'image', 'status'];
    }

    let query: FindAndCountOptions = {
        order: [[orderByCol, orderByAsc == 'true' ? 'ASC' : 'DESC']],
        where: {
            status: show_active_data == 'true' ? 'active' : 'deactive',
        },
        include: [
            {
                model: models.AccountModel,
                as: 'account',
                attributes: ['id','title','openning_date']
            },
            // {
            //     model: models.AccountLogModel,
            //     as: 'log',
            //     attributes: [],
            // },
            
        ],
        logging: true,
    };

    query.attributes = [
        ...select_fields,
        [
            Sequelize.literal(`(
                        SELECT SUM(logs.amount)
                        FROM account_logs AS logs
                        WHERE
                            logs.account_number_id = AccountNumberModel.id
                            AND
                            logs.type = "income"
                    )`),
            'total_income',
        ],
        [
            Sequelize.literal(`(
                        SELECT SUM(logs.amount)
                        FROM account_logs AS logs
                        WHERE
                            logs.account_number_id = AccountNumberModel.id
                            AND
                            logs.type = "expense"
                    )`),
            'total_expense',
        ],
    ];

    if(role && role != 'all'){
        query.where = {
            ...query.where,
            role: role,
        }
    }

    if (search_key) {
        query.where = {
            ...query.where,
            [Op.or]: [
                { account_id: { [Op.like]: `%${search_key}%` } },
                { number: { [Op.like]: `%${search_key}%` } },
                { status: { [Op.like]: `%${search_key}%` } },
                { id: { [Op.like]: `%${search_key}%` } },
            ],
        };
    }

    let total_income = await models.AccountLogModel.sum('amount',{
        where:{
            type: 'income',
        }
    });
    let total_expense = await models.AccountLogModel.sum('amount',{
        where:{
            type: 'expense',
        }
    });

    try {
        let data = await (fastify_instance as anyObject).paginate(
            req,
            models.AccountNumberModel,
            paginate,
            query,
        );

        data.total_income = total_income;
        data.total_expense = total_expense;
        // let data = {};
        // data = await models.AccountNumberModel.findAll(query);
        return response(200, 'data fetched', data);
    } catch (error: any) {
        let uid = await error_trace(models, error, req.url, req.query);
        throw new custom_error('server error', 500, error.message, uid);
    }
}

export default all;
