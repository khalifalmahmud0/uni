import db from '../models/db';
import user_db from '../../auth_management/user_management/models/db';
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
import project_payment_entry from './project_payment_entry';
import account_insentive_entry from './account_insentive_entry';

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
    console.log(req.user);

    let field = '';
    let fields = [
        // 'account_id',
        // 'account_number_id',
        // 'account_category_id',
        'amount',
        'value1'
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

    // field = 'user_id';
    // await body(field)
    //     .not()
    //     .isEmpty()
    //     .custom(async (value) => {
    //         const length = value.length;
    //         if (length <= 2) {
    //             throw new Error(
    //                 `the <b>${field.replaceAll('_', ' ')}</b> field is required`,
    //             );
    //         }
    //     })
    //     .withMessage(
    //         `the <b>${field.replaceAll('_', ' ')}</b> field is required`,
    //     )
    //     .run(req);

    let result = await validationResult(req);

    return result;
}
// async function store(
//     fastify_instance: FastifyInstance,
//     req: FastifyRequest,
// ): Promise<responseObject> {
//     throw new Error('500 test');
// }
async function store_gateway_payment(
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
    let user_models = await user_db();
    let body = req.body as anyObject;
    // let data = new models.AccountLogModel();

    /** check exists and return */
    let check_log = await models.AccountLogModel.findOne({
        where: {
            trx_id: body.invoice_no,
        }
    });

    if(check_log){
        let payment = await models.ProjectPaymentModel.findOne({
            where: {
                account_log_id: check_log.id,
            }
        })
        return response(201, 'data created', {
            payment: payment,
            log: check_log,
        });
    }

    /** if not exists then new entry */
    let transaction_data = JSON.parse(body.value1);

    let log = await project_payment_entry(fastify_instance, req, {
        account_id: 3,
        account_number_id: 3,
        user_id: transaction_data.user_id,
        account_category_id: transaction_data.account_category_id,
        type: 'income',
        trx_id: body.invoice_no,
        date: moment(body.date_time).format("YYYY-MM-DD HH:mm:ss"),
        amount: body.amount,
        amount_in_text: transaction_data.amount_in_text,
        description: transaction_data.payment_type,
    });

    /*** track project payment */
    let installment_no = await models.ProjectPaymentModel.count({
        where:{
            project_id: transaction_data.project_id,
            user_id: transaction_data.user_id,
        }
    });

    let user = await user_models.UserModel.findOne({
        where: {
            id: transaction_data.user_id,
        }
    });

    let project_payment = new models.ProjectPaymentModel();
    project_payment.project_id = transaction_data.project_id;
    project_payment.user_id = transaction_data.user_id;
    project_payment.reference_user_id = user?.mo;
    project_payment.account_log_id = (log as any).id;
    project_payment.date = moment(body.date_time).format('YYYY-MM-DD');
    project_payment.amount = body.amount;
    project_payment.amount_in_text = transaction_data.amount_in_text;
    project_payment.receipt_no = body.invoice_no;
    project_payment.installment_no = installment_no + 1;
    project_payment.type = transaction_data.payment_type;
    await project_payment.save();

    /** insentive calculation */
    let user_insentive_calculations = account_insentive_entry(fastify_instance, req, {
        project_payment_id: project_payment.id  || 1,
        customer_id: user?.id || 1,
        mo_id: user?.mo || 1,
        agm_id: user?.agm || 1,
        gm_id: user?.gm || 1,
        ed_id: user?.ed || 1,
        date: moment(body.date_time).format('YYYY-MM-DD'),
        amount: body.amount,
        type: transaction_data.payment_type,
    });

    /** print request data into console */
    // console.clear();
    // (fastify_instance as any).print(inputs);

    /** store data into database */
    try {
        return response(201, 'data created', {
            payment: project_payment,
        });
    } catch (error: any) {
        let uid = await error_trace(models, error, req.url, req.body);
        throw new custom_error('server error', 500, error.message, uid);
        // throw error;
    }
}

export default store_gateway_payment;
