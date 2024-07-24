class Payment {
  constructor({ id, amount, paymentDate, paymentMethod, status }) {
    this.id = id;
    this.amount = amount;
    this.paymentDate = paymentDate;
    this.paymentMethod = paymentMethod;
    this.status = status;
  }
  static async findAll() {}

  static async findById(id) {}

  static async findByPaymentDate(paymentDate) {}

  static async findByPaymentMethod(paymentMethod) {}

  static async findByStatus(status) {}

  static async create(data) {}

  static async update(id, data) {}

  static async delete(id) {}
}
