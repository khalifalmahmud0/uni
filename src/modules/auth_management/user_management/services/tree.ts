import db from '../models/db';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { anyObject, responseObject } from '../../../../common_types/object';
import response from '../helpers/response';
import error_trace from '../helpers/error_trace';
import custom_error from '../helpers/custom_error';

// async function details(
//     fastify_instance: FastifyInstance,
//     req: FastifyRequest,
// ): Promise<responseObject> {
//     throw new Error('500 test');
// }

async function tree(
    fastify_instance: FastifyInstance,
    req: FastifyRequest,
): Promise<responseObject> {
    let models = await db();
    let params = req.params as any;

    let auth_user_id = (req as anyObject).user.id;
    try {
        let data = await models.UserModel.findOne({
            where: {
                id: auth_user_id,
            },
            attributes: {
                exclude: ['password', 'token', 'forget_code', 'user_agent'],
            },
            include: [
                {
                    model: models.UserInformationModel,
                    as: 'info',
                },
                {
                    model: models.UserNomineeModel,
                    as: 'nominee_infos',
                },
                {
                    model: models.UserModel,
                    as: 'reference_info',
                },
                {
                    model: models.UserModel,
                    as: 'mo_info',
                },
                {
                    model: models.UserModel,
                    as: 'gm_info',
                },
                {
                    model: models.UserModel,
                    as: 'agm_info',
                },
                {
                    model: models.UserModel,
                    as: 'ed_info',
                },
                
                // {
                //     model: models.UserModel,
                //     as: 'eds',
                // },
                {
                    model: models.UserModel,
                    as: 'gms',
                    where: {
                        'gm': null,
                    },
                    include: [
                        {
                            model: models.UserModel,
                            as: 'agms',
                            where: {
                                'agm': null,
                            },
                            include: [
                                {
                                    model: models.UserModel,
                                    as: 'mos',
                                    where: {
                                        'mo': null,
                                    },
                                    include: [
                                        {
                                            model: models.UserModel,
                                            as: 'reference_info',
                                        },
                                    ]
                                },
                                {
                                    model: models.UserModel,
                                    as: 'reference_info',
                                },
                            ]
                        },
                        {
                            model: models.UserModel,
                            as: 'reference_info',
                        },
                    ],
                },
                
                
            ],
        });

        if (data) {
            console.log((req as anyObject).user);
            
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

export default tree;
