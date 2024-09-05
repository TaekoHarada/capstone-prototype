class User {
  constructor(id, name, email) {
    this.id = id;
    this.name = name;
    this.email = email;
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

module.exports = User;
