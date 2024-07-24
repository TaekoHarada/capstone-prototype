class Order {
  constructor({
    id,
    orderDate,
    deliverDate,
    orderItemId,
    customerId,
    totalAmount,
    status,
    deliverStatus,
  }) {
    this.id = id;
    this.orderDate = orderDate;
    this.deliverDate = deliverDate;
    this.orderItemId = orderItemId;
    this.customerId = customerId;
    this.totalAmount = totalAmount;
    this.status = status;
    this.deliverStatus = deliverStatus;
  }

  static async findAll() {}

  static async findById(id) {}

  static async findByCustomerId(customerId) {}

  static async findByOrderDate(date) {}

  static async findByDeliverDate(date) {}

  static async findByStatus(status) {}

  static async create(data) {}

  static async update(id, data) {}

  static async delete(id) {}
}
