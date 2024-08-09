'use strict';
import { FastifyInstance } from 'fastify';
import controller from './controller';
import booking_controller from './booking_controller';

module.exports = async function (fastify: FastifyInstance) {
    let prefix: string = '/projects';
    let booking_prefix: string = '/project/bookings';
    const controllerInstance = controller(fastify);
    const booking_controllerInstance = booking_controller(fastify);

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
};
