'use strict';
import fastify, {
    FastifyReply,
    FastifyRequest,
    FastifyInstance,
} from 'fastify';
import all from './services_project_payment/all';
import details from './services_project_payment/details';
import soft_delete from './services_project_payment/soft_delete';
import store from './services_project_payment/store';
import { responseObject } from '../../common_types/object';
import update from './services_project_payment/update';
import restore from './services_project_payment/restore';
import destroy from './services_project_payment/destroy';
import block from './services_project_payment/block';
import data_import from './services_project_payment/import';
import details_full from './services_project_payment/details_full';
import customer_payments from './services_project_payment/customer_payments';

export default function (fastify: FastifyInstance) {
    return {
        all: async function (req: FastifyRequest, res: FastifyReply) {
            let data: responseObject = await all(fastify, req);
            res
            .code(data.status)
            .header('Cache-Control', 'public, max-age=30') 
            .send(data);
        },

        find_full_details: async function (req: FastifyRequest, res: FastifyReply) {
            let data = await details_full(fastify, req);
            res.code(data.status).send(data);
        },

        customer_payments: async function (req: FastifyRequest, res: FastifyReply) {
            let data = await customer_payments(fastify, req);
            res.code(data.status).send(data);
        },

        find: async function (req: FastifyRequest, res: FastifyReply) {
            let data = await details(fastify, req);
            res.code(data.status).send(data);
        },

        store: async function (req: FastifyRequest, res: FastifyReply) {
            let data: responseObject = await store(fastify, req);
            res.code(data.status).send(data);
        },

        update: async function (req: FastifyRequest, res: FastifyReply) {
            let data: responseObject = await update(fastify, req);
            res.code(data.status).send(data);
        },

        soft_delete: async function (req: FastifyRequest, res: FastifyReply) {
            let data = await soft_delete(fastify, req);
            res.code(data.status).send(data);
        },

        restore: async function (req: FastifyRequest, res: FastifyReply) {
            let data = await restore(fastify, req);
            res.code(data.status).send(data);
        },

        destroy: async function (req: FastifyRequest, res: FastifyReply) {
            let data = await destroy(fastify, req);
            res.code(data.status).send(data);
        },

        block: async function (req: FastifyRequest, res: FastifyReply) {
            let data = await block(fastify, req);
            res.code(data.status).send(data);
        },

        import: async function (req: FastifyRequest, res: FastifyReply) {
            let data = await data_import(fastify, req);
            res.code(data.status).send(data);
        },

        // export: async function (req: FastifyRequest, res: FastifyReply) {},
    };
}
