module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('transactions', {
      id: {
        type: Sequelize.INTEGER,
        alowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      value: {
        type: Sequelize.DECIMAL(10, 2),
        alowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        alowNull: false,
      },
      payment_method: {
        type: Sequelize.ENUM,
        values: ['debit_card', 'credit_card'],
        alowNull: false,
      },
      card_number: {
        type: Sequelize.STRING,
        alowNull: false,
      },
      name_card_owner: {
        type: Sequelize.STRING,
        alowNull: false,
      },
      expiration_date_card: {
        type: Sequelize.DATE,
        alowNull: false,
      },
      cvv_card: {
        type: Sequelize.STRING,
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
    return queryInterface.dropTable('transactions');
  },
};
