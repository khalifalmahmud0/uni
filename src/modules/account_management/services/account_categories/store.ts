import db from '../../models/db';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { body, validationResult } from 'express-validator';
import {
    anyObject,
    responseObject,
    Request,
} from '../../../../common_types/object';
import response from '../../helpers/response';
import { InferCreationAttributes } from 'sequelize';
import custom_error from '../../helpers/custom_error';
import error_trace from '../../helpers/error_trace';
import moment from 'moment';

/** validation rules */
async function validate(req: Request) {
    let field = '';
    let fields = [
        'uid',
        'title',
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

    // field = 'reference';
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
    let data = new models.AccountCategoryModel();

    let image_path = "";

    if(body['image'].ext){
        image_path =
            'uploads/projects/' +
            moment().format('YYYYMMDDHHmmss') +
            body['image'].ext;
        await (fastify_instance as any).upload(body['image'], image_path);
    }
    
    let inputs: InferCreationAttributes<typeof data> = {
        // uid: body.uid,
        title: body.title,

        // description: body.description,
        // location: body.location,
        // map: body.map,
        // aveneue: body.aveneue,
        // plot: body.plot,
        // road: body.road,

        // per_share_cost: body.per_share_cost || 0,

        // video: body.video,
        // image: image_path,
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

export default store;
