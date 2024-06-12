'use strict';

/** @type {import('sequelize-cli').Migration} */
let tabe_name = 'kcategoryTable';
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
        function set_data(id, name, description) {
            data.push({
                id,
                name,
                description,
                created_at: '2024-02-14',
                updated_at: '2024-02-14',
            });
        }
        set_data(1, 'mr abul kasem', 'contact message1');
        set_data(2, 'mr abul kasem', 'contact message1');
        set_data(3, 'mr abul kasem', 'contact message1');

        await queryInterface.bulkDelete(tabe_name, null, {});
        await queryInterface.bulkInsert(tabe_name, data, {});
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         
         npx sequelize-cli db:seed:all --config src/configs/db.json --seeders-path src/modules/extra/contact_message/models/seeders
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete(tabe_name, null, {});
    },
};
