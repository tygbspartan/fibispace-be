const prisma = require('../config/prisma');
const bcrypt = require('bcrypt');

class UserService {
  async createUser(email, password, role = 'user') {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    return await prisma.user.create({
      data: {
        email,
        passwordHash: hashedPassword,
        role,
      },
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });
  }

  async findByEmail(email) {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id) {
    return await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });
  }

  async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}

module.exports = new UserService();