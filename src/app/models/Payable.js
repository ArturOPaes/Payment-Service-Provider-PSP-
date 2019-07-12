import { Model, Sequelize } from 'sequelize';

class Payable extends Model {
  static init(sequelize) {
    super.init(
      {
        status: Sequelize.ENUM(['paid', 'waiting_funds']),
        payment_date: Sequelize.DATE,
        refound_value: Sequelize.DECIMAL,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Transaction, {
      foreignKey: 'transaction_id',
      as: 'transaction',
    });
  }
}

export default Payable;
