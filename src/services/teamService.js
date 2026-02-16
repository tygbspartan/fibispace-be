const prisma = require("../config/prisma");

class TeamService {
  async createMember(memberData) {
    return await prisma.team.create({
      data: {
        name: memberData.name,
        designation: memberData.designation,
        aboutMe: memberData.aboutMe,
        image: memberData.image,
      },
    });
  }

  async findAllMembers() {
    return await prisma.team.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });
  }

  async findMemberById(id) {
    return await prisma.team.findUnique({
      where: { id: parseInt(id) },
    });
  }

  async updateMember(id, memberData) {
    const data = {};

    if (memberData.name !== undefined) data.name = memberData.name;
    if (memberData.designation !== undefined)
      data.designation = memberData.designation;
    if (memberData.aboutMe !== undefined) data.aboutMe = memberData.aboutMe;
    if (memberData.image !== undefined) data.image = memberData.image;

    return await prisma.team.update({
      where: { id: parseInt(id) },
      data,
    });
  }

  async deleteMember(id) {
    return await prisma.team.delete({
      where: { id: parseInt(id) },
    });
  }
}

module.exports = new TeamService();
