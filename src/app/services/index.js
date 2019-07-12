class Services {
  lastCardNumbers(numberCard) {
    return numberCard.slice(-4);
  }

  discountFee(value, fee) {
    return value - (value * fee) / 100;
  }
}

export default new Services();
