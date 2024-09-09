'use strict';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import check_auth_and_redirect from '../modules/auth_management/authetication/services/check_auth_and_redirect';
import check_is_loged_in from '../modules/auth_management/authetication/services/check_is_loged_in';
import logout from '../modules/auth_management/authetication/services/logout';
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
                return reply.view('dashboard/admin_uni.ejs');
            },
        )
        .get(
            '/customer',
            { preHandler: check_auth_and_redirect },
            async (_req: FastifyRequest, reply: FastifyReply) => {
                return reply.view('dashboard/customer.ejs');
            },
        )
        .get(
            '/mo',
            { preHandler: check_auth_and_redirect },
            async (_req: FastifyRequest, reply: FastifyReply) => {
                return reply.view('dashboard/mo.ejs');
            },
        )
        .get(
            '/print-invoice',
            async (_req: FastifyRequest, reply: FastifyReply) => {
                return reply.view('print/invoice.ejs');
            },
        )
        .get(
            '/print-payment-invoice',
            async (_req: FastifyRequest, reply: FastifyReply) => {
                return reply.view('print/payment_invoice.ejs');
            },
        )
        .post(
            '/logout',
            { preHandler: check_auth_and_redirect },
            async (_req: FastifyRequest, reply: FastifyReply) => {
                let res = await logout(fastify, _req);
                reply.clearCookie('token', {path: '/'});
                return reply.redirect(301, '/login');
                // return reply.view('print/payment_invoice.ejs');
            },
        )
        ;

    // .get(
    //     '/dashboard/login',
    //     async (_req: FastifyRequest, reply: FastifyReply) => {
    //         let html = await minified_view(fastify, 'auth/login.ejs');
    //         return reply.type('text/html').send(html);
    //     },
    // );
};
