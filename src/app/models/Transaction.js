import { Model, Sequelize } from 'sequelize';

class Transaction extends Model {
  static init(sequelize) {
    super.init(
      {
        value: Sequelize.DECIMAL,
        description: Sequelize.STRING,
        payment_method: Sequelize.ENUM(['debit_card', 'credit_card']),
        card_number: Sequelize.STRING,
        name_card_owner: Sequelize.STRING,
        expiration_date_card: Sequelize.DATE,
        cvv_card: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Transaction;
