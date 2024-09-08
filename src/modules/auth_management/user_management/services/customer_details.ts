import db from '../models/db';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { responseObject } from '../../../../common_types/object';
import response from '../helpers/response';
import error_trace from '../helpers/error_trace';
import custom_error from '../helpers/custom_error';

// async function details(
//     fastify_instance: FastifyInstance,
//     req: FastifyRequest,
// ): Promise<responseObject> {
//     throw new Error('500 test');
// }

async function customer_details(
    fastify_instance: FastifyInstance,
    req: FastifyRequest,
): Promise<responseObject> {
    let models = await db();
    let params = req.params as any;

    try {
        let data = await models.UserModel.findOne({
            where: {
                id: params.id,
            },
            attributes: {
                exclude: ['password', 'token', 'forget_code', 'user_agent'],
            },
            include: [
                {
                    model: models.UserProjectCustomerInformationModel,
                    as: "project_customer_information",
                    include: [
                        {
                            model: models.ProjectModel,
                            as: 'project_info'
                        }
                    ]
                }
            ],
        });

        if (data) {
            let installment_no = await models.UserProjectPaymentModel.count({
                where: {
                    user_id: data.id,
                    project_id: (data as any).project_customer_information?.project_id
                }
            });
            let paid = await models.UserProjectPaymentModel.sum( 'amount',{
                where: {
                    user_id: data.id,
                    project_id: (data as any).project_customer_information?.project_id
                }
            });
            return response(200, 'data found', {
                user: data,
                installment_no: installment_no,
                paid: paid,
            });
        } else {
            throw new custom_error('not found', 404, 'data not found');
        }
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

export default customer_details;
