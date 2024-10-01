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

  static async findByFirstName(firstname) {
    const data = await customerDAO.getByField("firstname", firstname);
    return data.map((customer) => new Customer(customer));
  }

  static async findByLastName(lastname) {
    const data = await customerDAO.getByField("lastname", lastname);
    return data.map((customer) => new Customer(customer));
  }

  static async create(id, data) {
    data.createdAt = new Date();
    data.updatedAt = new Date();
    const returnId = await customerDAO.create(id, data);
    return returnId;
  }

  static async update(id, data) {
    data.updatedAt = new Date();
    await customerDAO.update(id, data);
  }

  static async delete(id) {
    await customerDAO.delete(id);
  }
}

export default Customer;
