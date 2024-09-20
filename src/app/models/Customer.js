/**
 * Customer Class:
 *  This class represents a customer entity and provides static methods
 * for interacting with the 'customers' collection in Firestore. It leverages the
 * `FirestoreDAO` class to handle database operations.
 *
 * It handles converting plain Firestore data into `Customer` objects, so the data is
 * returned in a consistent, object-oriented way.
 *
 */

import FirestoreDAO from "/src/app/database/firestoreDAO";

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

  static async create(data) {
    data.createdAt = new Date();
    data.updatedAt = new Date();
    const id = await customerDAO.create(data);
    return id;
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
