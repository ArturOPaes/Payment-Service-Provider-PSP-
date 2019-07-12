module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('payables', {
      id: {
        type: Sequelize.INTEGER,
        alowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      status: {
        type: Sequelize.ENUM,
        values: ['paid', 'waiting_funds'],
        alowNull: false,
      },
      payment_date: {
        type: Sequelize.DATE,
        alowNull: false,
      },
      transaction_id: {
        type: Sequelize.INTEGER,
        references: { model: 'transactions', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        unique: true,
        alowNull: false,
      },
      refound_value: {
        type: Sequelize.DECIMAL(10, 2),
        alowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        alowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        alowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('payables');
  },
};
