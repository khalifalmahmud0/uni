'use strict';
import { FastifyInstance } from 'fastify';
import controller from './controller';
import check_auth from '../authetication/services/check_auth';

module.exports = async function (fastify: FastifyInstance) {
    let prefix: string = '/users';
    const controllerInstance = controller(fastify);

    fastify
        .get(`${prefix}`, controllerInstance.all)
        .get(`${prefix}/:id`, controllerInstance.find)
        .get(`${prefix}/customer/:id`, controllerInstance.customer_details)
        .get(`${prefix}/:id/tree`,{
            preHandler: check_auth,
        } , controllerInstance.tree)
        .post(`${prefix}/store`, controllerInstance.store)
        .post(`${prefix}/update`, controllerInstance.update)
        .post(`${prefix}/soft-delete`, controllerInstance.soft_delete)
        .post(`${prefix}/restore`, controllerInstance.restore)
        .post(`${prefix}/destroy`, controllerInstance.destroy)
        .post(`${prefix}/block`, controllerInstance.block)
        .post(`${prefix}/import`, controllerInstance.import);
};
