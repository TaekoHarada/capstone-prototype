import FirestoreDAO from "/src/app/database/firestoreDAO";

// collection name = 'orders'
const orderDAO = new FirestoreDAO("orders");

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
    createdAt,
    updatedAt,
  }) {
    this.id = id;
    this.orderDate = orderDate;
    this.deliverDate = deliverDate;
    this.orderItemId = orderItemId;
    this.customerId = customerId;
    this.totalAmount = totalAmount;
    this.status = status;
    this.deliverStatus = deliverStatus;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static async findAll() {
    const data = await orderDAO.getAll();
    return data.map((order) => new Order(order));
  }

  static async findById(id) {
    const data = await orderDAO.getById(id);
    if (data) {
      return new Order(data);
    }
    return null;
  }

  static async findByCustomerId(customerId) {
    const data = await orderDAO.getByField("customerId", customerId);
    return data.map((order) => new Order(order));
  }

  static async findByStatus(status) {
    const data = await orderDAO.getByField("status", status);
    return data.map((order) => new Order(order));
  }

  static async create(id, data) {
    data.createdAt = new Date();
    data.updatedAt = new Date();
    const returnId = await orderDAO.create(id, data);
    return returnId;
  }

  static async update(id, data) {
    data.updatedAt = new Date();
    await orderDAO.update(id, data);
  }

  static async delete(id) {
    await orderDAO.delete(id);
  }
}

export default Order;
