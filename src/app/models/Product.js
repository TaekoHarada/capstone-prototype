class Product {
  constructor({ id, name, description, price, categoryId }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.categoryId = categoryId;
  }
  static async findAll() {}

  static async findById(id) {}

  static async findByName(name) {}

  static async findByCategoryId(categoryId) {}

  static async create(data) {}

  static async update(id, data) {}

  static async delete(id) {}
}
