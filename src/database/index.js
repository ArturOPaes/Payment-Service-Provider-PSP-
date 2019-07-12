import Sequelize from 'sequelize';

import Transaction from '../app/models/Transaction';
import Payable from '../app/models/Payable';

import databaseConfig from '../config/database';

const models = [Transaction, Payable];

class Database {
  constructor() {
    this.connect();
  }

  connect() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));

    Sequelize.postgres.DECIMAL.parse = function(value) {
      return parseFloat(value);
    };
  }

  desconnect() {
    this.connection.desconnect();
  }
}

export default new Database();
