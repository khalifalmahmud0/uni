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
    let user = (req as anyObject).user;
    // console.log(auth_user_id);
    
    let attributes = ['id','uid','reference','name','mo','agm','gm','ed','image'];

    let agm_relation = [
        {
            model: models.UserModel,
            as: 'mos',
            attributes: attributes,
            where: {
                designation: 'mo',
            }
        }
    ];
    
    let gm_relation = [
        {
            model: models.UserModel,
            as: 'agms',
            attributes: attributes,
            includes: [
                {
                    model: models.UserModel,
                    as: 'mos',
                    attributes: attributes,
                }
            ]
        }
    ];
    
    let ed_relation = [
        {
            model: models.UserModel,
            as: 'agms',
            attributes: attributes,
            includes: [
                {
                    model: models.UserModel,
                    as: 'mos',
                    attributes: attributes,
                }
            ]
        }
    ];

    function get_include(){
        if(user.designation == 'agm'){
            return agm_relation;
        }else if(user.designation == 'gm'){
            return gm_relation;
        }else if(user.designation == 'ed'){
            return  ed_relation;
        }
    }

    try {
        let data = await models.UserModel.findOne({
            where: {
                id: auth_user_id,
            },
            attributes: attributes,
            include: get_include(),
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

export default tree;
