import db from '../models/db';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { anyObject, responseObject } from '../../../common_types/object';
import response from '../helpers/response';
import error_trace from '../helpers/error_trace';
import custom_error from '../helpers/custom_error';

// async function details(
//     fastify_instance: FastifyInstance,
//     req: FastifyRequest,
// ): Promise<responseObject> {
//     throw new Error('500 test');
// }

async function details(
    fastify_instance: FastifyInstance,
    req: FastifyRequest,
): Promise<responseObject> {
    let models = await db();
    let params = req.params as any;

    try {
        let select_fields = ['id', 'uid', 'name' ];
        let data = await models.ProjectCustomerModel.findOne({
            where: {
                id: params.id,
            },
            include: [
                {
                    model: models.ProjectModel,
                    as: 'project'
                },
                {
                    model: models.ProjectCustomerInfomationModel,
                    as: 'details'
                },
                {
                    model: models.UserModels,
                    as: 'customer'
                },
                {
                    model: models.UserModels,
                    as: 'reference'
                },
                {
                    model: models.UserModels,
                    as: 'ed'
                },
                {
                    model: models.UserModels,
                    as: 'gm'
                },
                {
                    model: models.UserModels,
                    as: 'agm'
                },
                {
                    model: models.UserModels,
                    as: 'mo',
                    include: [
                        {
                            model: models.UserModels,
                            as: 'agm_info',
                            attributes: select_fields,
                        },
                        {
                            model: models.UserModels,
                            as: 'gm_info',
                            attributes: select_fields,
                        },
                        {
                            model: models.UserModels,
                            as: 'ed_info',
                            attributes: select_fields,
                        },
                    ]
                },
            ]
        });
        
        if (data) {
            return response(200, 'data found', data);
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

export default details;
