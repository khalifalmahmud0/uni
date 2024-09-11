'use strict';
import { FastifyInstance } from 'fastify';
import controller from './controller';
import booking_controller from './booking_controller';
import project_payment_controller from './project_payment_controller';

module.exports = async function (fastify: FastifyInstance) {
    let prefix: string = '/projects';
    const controllerInstance = controller(fastify);

    fastify
        .get(`${prefix}`, controllerInstance.all)
        .get(`${prefix}/:id`, controllerInstance.find)
        .post(`${prefix}/store`, controllerInstance.store)
        .post(`${prefix}/update`, controllerInstance.update)
        .post(`${prefix}/soft-delete`, controllerInstance.soft_delete)
        .post(`${prefix}/restore`, controllerInstance.restore)
        .post(`${prefix}/destroy`, controllerInstance.destroy)
        .post(`${prefix}/block`, controllerInstance.block)
        .post(`${prefix}/import`, controllerInstance.import);

    let booking_prefix: string = '/project/bookings';
    const booking_controllerInstance = booking_controller(fastify);
    fastify
        .get(`${booking_prefix}`, booking_controllerInstance.all)
        .get(`${booking_prefix}/:id`, booking_controllerInstance.find)
        .post(`${booking_prefix}/store`, booking_controllerInstance.store)
        .post(`${booking_prefix}/update`, booking_controllerInstance.update)
        .post(`${booking_prefix}/soft-delete`, booking_controllerInstance.soft_delete)
        .post(`${booking_prefix}/restore`, booking_controllerInstance.restore)
        .post(`${booking_prefix}/destroy`, booking_controllerInstance.destroy)
        .post(`${booking_prefix}/block`, booking_controllerInstance.block)
        .post(`${booking_prefix}/import`, booking_controllerInstance.import);
    
    let project_payment_prefix: string = '/project/payments';
    const project_payment_controllerInstance = project_payment_controller(fastify);
    fastify
        .get(`${project_payment_prefix}`, project_payment_controllerInstance.all)
        .post(`${project_payment_prefix}/store`, project_payment_controllerInstance.store)
        .post(`${project_payment_prefix}/update`, project_payment_controllerInstance.update)
        .post(`${project_payment_prefix}/soft-delete`, project_payment_controllerInstance.soft_delete)
        .post(`${project_payment_prefix}/restore`, project_payment_controllerInstance.restore)
        .post(`${project_payment_prefix}/destroy`, project_payment_controllerInstance.destroy)
        .post(`${project_payment_prefix}/block`, project_payment_controllerInstance.block)
        .get(`${project_payment_prefix}/details/:id`, project_payment_controllerInstance.find_full_details)
        .get(`${project_payment_prefix}/customer/:id`, project_payment_controllerInstance.customer_payments)
        .get(`${project_payment_prefix}/:id`, project_payment_controllerInstance.find)
        .post(`${project_payment_prefix}/import`, project_payment_controllerInstance.import);
};
