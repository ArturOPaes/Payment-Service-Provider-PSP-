import Payable from '../models/Payable';
import Transaction from '../models/Transaction';
import Services from '../services/index';

class PayableController {
  async findAll(req, res) {
    const paid_payables = await Payable.findAll({
      where: { status: 'paid' },
      order: [['created_at', 'DESC']],
      include: [
        {
          model: Transaction,
          as: 'transaction',
          attributes: ['id', 'value', 'createdAt', 'updatedAt'],
        },
      ],
      attributes: {
        exclude: ['transaction_id'],
      },
    });

    let total_paid = 0;
    let total_waiting_funds = 0;

    paid_payables.forEach(paidPayable => {
      total_paid += paidPayable.refound_value;
    });

    const waiting_funds_payables = await Payable.findAll({
      where: { status: 'waiting_funds' },
      order: [['created_at', 'DESC']],
      include: [
        {
          model: Transaction,
          as: 'transaction',
          attributes: ['id', 'value', 'createdAt', 'updatedAt'],
        },
      ],
      attributes: {
        exclude: ['transaction_id'],
      },
    });

    waiting_funds_payables.forEach(waitingFundsPayable => {
      total_waiting_funds += waitingFundsPayable.refound_value;
    });

    return res.json({
      total_paid,
      total_waiting_funds,
      paid_payables,
      waiting_funds_payables,
    });
  }

  async insert(transaction) {
    const { id, payment_method, value, createdAt } = transaction;

    let status;
    let payment_date = createdAt;
    let refound_value;

    if (payment_method === 'credit_card') {
      // fee 5%
      refound_value = Services.discountFee(value, 5);
      status = 'waiting_funds';
      payment_date = payment_date.setDate(payment_date.getDate() + 30);
    } else {
      // fee 3%
      refound_value = Services.discountFee(value, 3);
      status = 'paid';
    }
    await Payable.create({
      transaction_id: id,
      status,
      payment_date,
      refound_value,
    });
  }
}

export default new PayableController();
