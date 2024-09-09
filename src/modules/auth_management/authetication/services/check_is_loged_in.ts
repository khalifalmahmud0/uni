import { FastifyReply, FastifyRequest } from 'fastify';
import { anyObject } from '../../../../common_types/object';
import db from '../../user_management/models/db';
import { env } from 'process';

const check_is_loged_in = async (
    request: FastifyRequest,
    reply: FastifyReply,
) => {
    const secretKey = env.JTI;
    const jwt = require('jsonwebtoken');
    // const token = request.headers.authorization;
    const token = request.cookies.token;

    if (!token || !token.startsWith('Bearer ')) {
        return;
    }

    const decoded = jwt.verify(token.slice(7), secretKey);
    let models = await db();
    let user = await models.UserModel.findByPk(decoded.id);

    if (user && user.token == decoded.token) {
        (request as anyObject).user = user;
        if(user.role == 'customer'){
            return reply.redirect('/customer');
        }else if(user.role == 'admin'){
            return reply.redirect('/admin');
        }else if(user.role == 'marketing'){
            return reply.redirect('/mo');
        }
    } else {
        return;
    }
};

export default check_is_loged_in;
