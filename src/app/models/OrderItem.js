class OrderItem {
  constructor({ id, quantity, price }) {
    this.id = id;
    this.quantity = quantity;
    this.price = price;
  }
  static async findAll() {}

  static async findById(id) {}

  static async create(data) {}

  static async update(id, data) {}

  static async delete(id) {}
}
