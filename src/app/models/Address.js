class Address {
  constructor({ id, street, city, province, zipCode, description }) {
    this.id = id;
    this.street = street;
    this.city = city;
    this.province = province;
    this.zipCode = zipCode;
    this.description = description;
  }
  static async findAll() {}

  static async findById(id) {}

  static async create(data) {}

  static async update(id, data) {}

  static async delete(id) {}
}
