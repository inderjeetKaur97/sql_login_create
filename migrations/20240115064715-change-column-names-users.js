'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn('blogs', 'createdAt', 'created_at');
    await queryInterface.renameColumn('blogs', 'updatedAt', 'updated_at');
    // Drop the existing timestamps
    await queryInterface.removeColumn('blogs', 'created_at');
    await queryInterface.removeColumn('blogs', 'updated_at');

    await queryInterface.addColumn('blogs', 'created_at', {
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('NOW'),
      allowNull: false,
    });

    await queryInterface.addColumn('blogs', 'updated_at', {
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('NOW'),
      allowNull: false,
    });
    // await queryInterface.changeColumn('blogs', 'created_at', {
    //   allowNull: false,
    //   type: Sequelize.DATE,
    //   defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    // });
    // await queryInterface.changeColumn('blogs', 'updated_at', {
    //   allowNull: false,
    //   type: Sequelize.DATE,
    //   defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
    // });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn('blogs', 'created_at', 'createdAt');
    await queryInterface.renameColumn('blogs', 'updated_at', 'updatedAt');
    await queryInterface.changeColumn('blogs', 'created_at', {
      type: Sequelize.DATE,
      defaultValue: null,
      allowNull: null
    });
    await queryInterface.changeColumn('blogs', 'updated_at', {
      type: Sequelize.DATE,
      defaultValue: null,
      allowNull: null
    });
  }
};
