'use strict';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import check_auth_and_redirect from '../modules/auth_management/authetication/services/check_auth_and_redirect';
import check_is_loged_in from '../modules/auth_management/authetication/services/check_is_loged_in';
// import minified_view from '../helpers/minified_view';

module.exports = async function (fastify: FastifyInstance) {
    fastify
        .get(
            '/',
            { preHandler: check_is_loged_in },
            async (_req: FastifyRequest, reply: FastifyReply) => {
                // return reply.view('website/index.ejs');
                return reply.view('auth/admin_login.ejs');
            },
        )
        .get(
            '/login',
            { preHandler: check_is_loged_in },
            async (_req: FastifyRequest, reply: FastifyReply) => {
                return reply.view('auth/admin_login.ejs');
            },
        )

        .get(
            '/admin',
            { preHandler: check_auth_and_redirect },
            async (_req: FastifyRequest, reply: FastifyReply) => {
                return reply.view('dashboard/admin.ejs');
            },
        );

    // .get(
    //     '/dashboard/login',
    //     async (_req: FastifyRequest, reply: FastifyReply) => {
    //         let html = await minified_view(fastify, 'auth/login.ejs');
    //         return reply.type('text/html').send(html);
    //     },
    // );
};
