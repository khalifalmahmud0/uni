'use strict';
import fastify, {
    FastifyReply,
    FastifyRequest,
    FastifyInstance,
} from 'fastify';
import all from './services/all';
import details from './services/details';
import soft_delete from './services/soft_delete';
import store from './services/store';
import { responseObject } from '../../../common_types/object';
import update from './services/update';
import restore from './services/restore';
import destroy from './services/destroy';
import block from './services/block';
import data_import from './services/import';
import tree from './services/tree';
import customer_details from './services/customer_details';
import insetive_calculation from './services/insetive_calculation';
import update_profile from './services/update_profile';
import employee_details from './services/employee_details';
import refered_customers from './services/refered_customers';

export default function (fastify: FastifyInstance) {
    return {
        all: async function (req: FastifyRequest, res: FastifyReply) {
            let data: responseObject = await all(fastify, req);
            res
            .code(data.status)
            .header('Cache-Control', 'public, max-age=30') 
            .send(data);
        },

        find: async function (req: FastifyRequest, res: FastifyReply) {
            let data = await details(fastify, req);
            res.code(data.status).send(data);
        },

        customer_details: async function (req: FastifyRequest, res: FastifyReply) {
            let data = await customer_details(fastify, req);
            res.code(data.status).send(data);
        },

        refered_customers: async function (req: FastifyRequest, res: FastifyReply) {
            let data = await refered_customers(fastify, req);
            res.code(data.status).send(data);
        },

        employee_details: async function (req: FastifyRequest, res: FastifyReply) {
            let data = await employee_details(fastify, req);
            res.code(data.status).send(data);
        },

        tree: async function (req: FastifyRequest, res: FastifyReply) {
            let data = await tree(fastify, req);
            res.code(data.status).send(data);
        },

        insetive_calculation: async function (req: FastifyRequest, res: FastifyReply) {
            let data = await insetive_calculation(fastify, req);
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

        update_profile: async function (req: FastifyRequest, res: FastifyReply) {
            let data: responseObject = await update_profile(fastify, req);
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
