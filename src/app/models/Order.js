import FirestoreDAO from "/src/app/database/firestoreDAO";

// collection name = 'orders'
const orderDAO = new FirestoreDAO("orders");

class Order {
  constructor({
    id,
    status,
    customerId,
    orderItemId,
    shippingType,
    paymentMethod,
    totalAmount,
    paidBalance,
    orderDate,
    deliverDate,
    paymentDate,
    createdAt,
    updatedAt,
  }) {
    this.id = id;
    this.status = status;
    this.customerId = customerId;
    this.orderItemId = orderItemId;
    this.shippingType = shippingType;
    this.paymentMethod = paymentMethod;
    this.totalAmount = totalAmount;
    this.paidBalance = paidBalance;
    this.orderDate = orderDate;
    this.deliverDate = deliverDate;
    this.paymentDate = paymentDate;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static async findAll() {
    const data = await orderDAO.getAll();

    // Convert Timestamp objects to a format React can render
    const formattedData = data.map((order) => ({
      ...order,
      orderDate: order.orderDate?.toDate().toLocaleDateString(),
      deliverDate: order.deliverDate?.toDate().toLocaleDateString(),
      paymentDate: order.paymentDate?.toDate().toLocaleDateString(),
    }));

    console.log("Order find all: ", formattedData);
    return formattedData.map((order) => new Order(order));
  }

  static async findById(id) {
    const data = await orderDAO.getById(id);
    if (data) {
      const formattedData = {
        ...data,
        orderDate: data.orderDate
          ? data.orderDate.toDate().toLocaleDateString()
          : null,
        deliverDate: data.deliverDate
          ? data.deliverDate.toDate().toLocaleDateString()
          : null,
        paymentDate: data.paymentDate
          ? data.paymentDate.toDate().toLocaleDateString()
          : null,
      };

      return new Order(formattedData);
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

  static async findByFirstName(firstname) {
    const data = await orderDAO.getByField("firstname", firstname);
    return data.map((order) => new Order(order));
  }

  static async findByLastName(lastname) {
    const data = await orderDAO.getByField("lastname", lastname);
    return data.map((order) => new Order(order));
  }

  static async create(id, data) {
    const returnId = await orderDAO.create(id, data);
    return returnId;
  }

  static async update(id, data) {
    await orderDAO.update(id, data);
  }

  static async delete(id) {
    await orderDAO.delete(id);
  }
}

export default Order;
