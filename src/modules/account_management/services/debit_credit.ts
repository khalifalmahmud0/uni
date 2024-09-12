import db from '../models/db';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { responseObject } from '../../../common_types/object';
import response from '../helpers/response';
import error_trace from '../helpers/error_trace';
import custom_error from '../helpers/custom_error';
import moment from 'moment';
import { Op } from 'sequelize';

// async function details(
//     fastify_instance: FastifyInstance,
//     req: FastifyRequest,
// ): Promise<responseObject> {
//     throw new Error('500 test');
// }

async function debit_credit(
    fastify_instance: FastifyInstance,
    req: FastifyRequest,
): Promise<responseObject> {
    let models = await db();
    let params = req.query as any;
    
    let start_date = moment().subtract(30, 'days').format('YYYY-MM-DD');
    let end_date = moment().add(1, 'days').format('YYYY-MM-DD');

    if(params.start_date && params.end_date){
        start_date = params.start_date;
        end_date = moment(params.end_date).add(1, 'days').format('YYYY-MM-DD');
    }

    try {
        let data = await models.AccountLogModel.findAll({
            where: {
                date: {
                    [Op.gte]: start_date, // Start of today
                    [Op.lte]: end_date,
                },
            },
            include: [
                {
                    model: models.AccountCategoryModel,
                    as: 'category',
                    attributes: ['id','title'],
                },
                {
                    model: models.AccountNumberModel,
                    as: 'account_number',
                    attributes: ['id','number']
                },
                {
                    model: models.UserModel,
                    as: 'user',
                    attributes: ['id','uid','name']
                },
            ]
        });

        return response(200, 'data found', data);
        
    } catch (error: any) {
        let uid = await error_trace(models, error, req.url, req.params);
        if (error instanceof custom_error) {
            error.uid = uid;
        } else {
            throw new custom_error('server error', 500, error.message, uid);
        }
        throw error;
    }
}

export default debit_credit;
