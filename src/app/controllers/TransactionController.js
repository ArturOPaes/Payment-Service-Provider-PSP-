import * as Yup from 'yup';
import { parse } from 'date-fns';
import Transaction from '../models/Transaction';
import Services from '../services/index';
import PayableController from './PayableController';

class TransactionController {
  async findAll(req, res) {
    const transactions = await Transaction.findAll({
      order: [['created_at', 'DESC']],
    });

    if (transactions.length > 0) {
      transactions.map(transaction => {
        transaction.card_number = Services.lastCardNumbers(
          transaction.card_number
        );
        return transaction;
      });
    }

    return res.json(transactions);
  }

  async insert(req, res) {
    const schema = Yup.object().shape({
      value: Yup.number().required(),
      description: Yup.string().required(),
      payment_method: Yup.string().required(),
      card_number: Yup.string()
        .min(16)
        .required(),
      name_card_owner: Yup.string().required(),
      expiration_date_card: Yup.date().required(),
      cvv_card: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation of schema fails' });
    }

    const {
      value,
      description,
      payment_method,
      card_number,
      name_card_owner,
      expiration_date_card,
      cvv_card,
    } = req.body;

    if (payment_method !== 'debit_card' && payment_method !== 'credit_card') {
      return res.status(400).json({ error: 'invalid payment method' });
    }

    let transaction;

    try {
      transaction = await Transaction.create({
        value,
        description,
        payment_method,
        card_number,
        name_card_owner,
        expiration_date_card: parse(expiration_date_card, 'ddyy', new Date()),
        cvv_card,
      });

      await PayableController.insert(transaction);
    } catch (err) {
      return res.status(500).json({ error: `failed to insert: ${err}` });
    }

    transaction.card_number = Services.lastCardNumbers(transaction.card_number);

    return res.json(transaction);
  }
}

export default new TransactionController();
