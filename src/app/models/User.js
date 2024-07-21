// models/User.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class User {
  static async findAll() {
    return await prisma.user.findMany();
  }

  static async findById(id) {
    return await prisma.user.findUnique({ where: { id: parseInt(id) } });
  }

  static async create(data) {
    return await prisma.user.create({ data });
  }

  static async update(id, data) {
    return await prisma.user.update({
      where: { id: parseInt(id) },
      data,
    });
  }

  static async delete(id) {
    return await prisma.user.delete({ where: { id: parseInt(id) } });
  }
}

export default User;
