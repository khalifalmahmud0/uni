'use strict';
import { FastifyInstance } from 'fastify';
import account_category_controller from './account_category_controller';
import account_controller from './account_controller';
import account_log_controller from './account_log_controller';
import account_number_controller from './account_number_controller';

module.exports = async function (fastify: FastifyInstance) {
    let prefix: string = '/account/categories';
    const AccountCategoryControllerInstance = account_category_controller(fastify);
    fastify
        .get(`${prefix}`, AccountCategoryControllerInstance.all)
        .get(`${prefix}/:id`, AccountCategoryControllerInstance.find)
        .post(`${prefix}/store`, AccountCategoryControllerInstance.store)
        .post(`${prefix}/update`, AccountCategoryControllerInstance.update)
        .post(`${prefix}/soft-delete`, AccountCategoryControllerInstance.soft_delete)
        .post(`${prefix}/restore`, AccountCategoryControllerInstance.restore)
        .post(`${prefix}/destroy`, AccountCategoryControllerInstance.destroy)
        .post(`${prefix}/block`, AccountCategoryControllerInstance.block)
        .post(`${prefix}/import`, AccountCategoryControllerInstance.import);
    
    const AccountControllerInstance = account_controller(fastify);
    prefix = '/account';
    fastify
        .get(`${prefix}`, AccountControllerInstance.all)
        .get(`${prefix}/:id`, AccountControllerInstance.find)
        .post(`${prefix}/store`, AccountControllerInstance.store)
        .post(`${prefix}/update`, AccountControllerInstance.update)
        .post(`${prefix}/soft-delete`, AccountControllerInstance.soft_delete)
        .post(`${prefix}/restore`, AccountControllerInstance.restore)
        .post(`${prefix}/destroy`, AccountControllerInstance.destroy)
        .post(`${prefix}/block`, AccountControllerInstance.block)
        .post(`${prefix}/import`, AccountControllerInstance.import);

    const AccountLogControllerInstance = account_log_controller(fastify);
    prefix = '/account/logs';
    fastify
        .get(`${prefix}`, AccountLogControllerInstance.all)
        .get(`${prefix}/incomes`, AccountLogControllerInstance.all_incomes)
        .get(`${prefix}/expenses`, AccountLogControllerInstance.all_expense)
        .get(`${prefix}/:id`, AccountLogControllerInstance.find)
        .post(`${prefix}/store`, AccountLogControllerInstance.store)
        .post(`${prefix}/store-expense`, AccountLogControllerInstance.store_expense)
        .post(`${prefix}/update`, AccountLogControllerInstance.update)
        .post(`${prefix}/soft-delete`, AccountLogControllerInstance.soft_delete)
        .post(`${prefix}/restore`, AccountLogControllerInstance.restore)
        .post(`${prefix}/destroy`, AccountLogControllerInstance.destroy)
        .post(`${prefix}/block`, AccountLogControllerInstance.block)
        .post(`${prefix}/import`, AccountLogControllerInstance.import);

    const AccountNumberControllerInstance = account_number_controller(fastify);
    prefix = '/account/numbers';
    fastify
        .get(`${prefix}`, AccountNumberControllerInstance.all)
        .get(`${prefix}/:id`, AccountNumberControllerInstance.find)
        .post(`${prefix}/store`, AccountNumberControllerInstance.store)
        .post(`${prefix}/update`, AccountNumberControllerInstance.update)
        .post(`${prefix}/soft-delete`, AccountNumberControllerInstance.soft_delete)
        .post(`${prefix}/restore`, AccountNumberControllerInstance.restore)
        .post(`${prefix}/destroy`, AccountNumberControllerInstance.destroy)
        .post(`${prefix}/block`, AccountNumberControllerInstance.block)
        .post(`${prefix}/import`, AccountNumberControllerInstance.import);

};
