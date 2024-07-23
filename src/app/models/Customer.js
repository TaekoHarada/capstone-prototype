import FirestoreDAO from "/src/app/database/firestoreDAO"; // Adjust the path as needed

// collection name = 'customers'
const customerDAO = new FirestoreDAO("customers");

class Customer {
  constructor({
    id,
    firstname,
    lastname,
    email,
    phone,
    address,
    note,
    createdAt,
    updatedAt,
  }) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.note = note;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static async findAll() {
    const data = await customerDAO.getAll();
    return data.map((customer) => new Customer(customer));
  }

  static async findById(id) {
    const data = await customerDAO.getById(id);
    if (data) {
      return new Customer(data);
    }
    return null;
  }

  static async create(data) {
    // Add timestamps if needed
    data.createdAt = new Date();
    data.updatedAt = new Date();
    const id = await customerDAO.create(data);
    return id;
  }

  static async update(id, data) {
    // Update the updatedAt field
    data.updatedAt = new Date();
    await customerDAO.update(id, data);
  }

  static async delete(id) {
    await customerDAO.delete(id);
  }
}

export default Customer;
