module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('customers', 'status', {
      type: Sequelize.ENUM('ACTIVE', 'ARCHIVED'),
      allowNull: false,
      defaultValue: 'ACTIVE',
    });
  },

  down: async queryInterface =>
    queryInterface.sequelize.transaction(async transaction => {
      await queryInterface.removeColumn('customers', 'status', { transaction });
      await queryInterface.sequelize.query('DROP TYPE enum_customers_status', {
        transaction,
      });
    }),
};
