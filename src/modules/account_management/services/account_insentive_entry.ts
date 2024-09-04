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
    const uid = `${year}${month}${day}-${randomNum}`;
    return uid;
}

async function account_insentive_entry(
    fastify_instance: FastifyInstance,
    req: FastifyRequest,
    param: {
        project_payment_id: number,
        customer_id: number,
        mo_id: number,
        agm_id: number,
        gm_id: number,
        ed_id: number,

        date?: string,
        amount: number,
        type?: 'booking_money'| 'down_payment'| 'installment'| 'reference_commision',
    }
): Promise<object> {

    /** initializations */
    let models = await db();
    let data = new models.AccountUserSalesInsentiveCalculationModel();

    /** store data into database */
    try {

        let mo_amount = 0;
        let agm_amount = 0;
        let gm_amount = 0;
        let ed_amount = 0;

        if(param.type == 'booking_money'){
            mo_amount = (+param.amount) * .40;
            agm_amount = mo_amount * .15;
            gm_amount = agm_amount * .10;
            ed_amount = gm_amount * .05;
        }
        
        if(param.type == 'down_payment'){
            mo_amount = (+param.amount) * .15;
            agm_amount = mo_amount * .07;
            gm_amount = agm_amount * .05;
            ed_amount = gm_amount * .03;
        }
        
        if(param.type == 'installment'){
            mo_amount = (+param.amount) * .08;
            agm_amount = mo_amount * .05;
            gm_amount = agm_amount * .04;
            ed_amount = gm_amount * .03;
        }

        await models.AccountUserSalesInsentiveCalculationModel.create({
            project_payment_id: param.project_payment_id,
            customer_id: param.customer_id,
            mo_id: param.mo_id,
    
            date: moment().toString(),
            amount: mo_amount,
            type: param.type,

        });
        
        await models.AccountUserSalesInsentiveCalculationModel.create({
            project_payment_id: param.project_payment_id,
            customer_id: param.customer_id,
            agm_id: param.agm_id,
    
            date: moment().toString(),
            amount: agm_amount,
            type: param.type,
        });

        await models.AccountUserSalesInsentiveCalculationModel.create({
            project_payment_id: param.project_payment_id,
            customer_id: param.customer_id,
            gm_id: param.gm_id,
    
            date: moment().toString(),
            amount: gm_amount,
            type: param.type,
        });
        
        await models.AccountUserSalesInsentiveCalculationModel.create({
            project_payment_id: param.project_payment_id,
            customer_id: param.customer_id,
            ed_id: param.ed_id,
    
            date: moment().toString(),
            amount: ed_amount,
            type: param.type,
        });

        return data;
    } catch (error: any) {
        let uid = await error_trace(models, error, req.url, req.body);
        throw new custom_error('server error', 500, error.message, uid);
        // throw error;
    }
}

export default account_insentive_entry;
