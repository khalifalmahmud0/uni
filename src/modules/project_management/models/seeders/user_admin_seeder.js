'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */

        let data = [];
        function set_data(
            id,
            name,
            email,
            phone_number,
            image = '/assets/dashboard/images/avatar.png',
        ) {
            data.push({
                id,
                name,
                role: name,
                email,
                phone_number,
                image,
                password:
                    '$2a$12$.aO5lxRR2qnICFEhMGaK8.aoAut89QnkhMn4hASjuvXfDA9StWAp6',
                created_at: '2024-02-14',
                updated_at: '2024-02-14',
            });
        }
        set_data(
            1,
            'super_admin',
            'super_admin@gmail.com',
            '01784493854',
            'avatar.png',
        );
        set_data(2, 'admin', 'admin@gmail.com', '01784493855', 'avatar.png');
        set_data(
            3,
            'accountant',
            'accountant@gmail.com',
            '01784493856',
            'avatar.png',
        );
        set_data(
            4,
            'employee',
            'employee@gmail.com',
            '01784493856',
            'avatar.png',
        );
        set_data(
            5,
            'customer',
            'customer@gmail.com',
            '01784493856',
            'avatar.png',
        );

        await queryInterface.bulkDelete('users', null, {});
        await queryInterface.bulkInsert('users', data, {});
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         
         npx sequelize-cli db:seed:all --config src/configs/db.json --seeders-path src/modules/user_management/user_admin/models/seeders
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('users', null, {});
    },
};
