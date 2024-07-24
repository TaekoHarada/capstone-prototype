class Category {
  constructor({ id, name, description }) {
    this.id = id;
    this.name = name;
    this.description = description;
  }
  static async findAll() {}

  static async findById(id) {}

  static async findByName(name) {}

  static async create(data) {}

  static async update(id, data) {}

  static async delete(id) {}
}
