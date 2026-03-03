const prisma = require("../config/prisma");

class ClientService {
  async createClient(clientData) {
    return await prisma.client.create({
      data: {
        name: clientData.name,
        image: clientData.image,
      },
    });
  }

  async findAllClients() {
    return await prisma.client.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });
  }

   async findClientById(id) {
    return await prisma.client.findUnique({
      where: { id: parseInt(id) },
    });
  }

  async updateClient(id, clientData) {
    const data = {};

    if (clientData.name !== undefined) data.name = clientData.name;
    if (clientData.image !== undefined) data.image = clientData.image;

    return await prisma.client.update({
      where: { id: parseInt(id) },
      data,
    });
  }

  async deleteClient(id) {
    return await prisma.client.delete({
      where: { id: parseInt(id) },
    });
  }
}

module.exports = new ClientService();
