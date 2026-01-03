const prisma = require('../config/prisma');

class ProjectService {
  async createProject(projectData) {
    return await prisma.project.create({
      data: {
        title: projectData.title,
        description: projectData.description,
        category: projectData.category,
        mainImage: projectData.mainImage,
        thumbnailImages: projectData.thumbnailImages || [],
        keyFindings: projectData.keyFindings || [],
      },
    });
  }

  async findAllProjects(filters = {}) {
    const where = {};

    // Filter by category if provided
    if (filters.category) {
      where.category = {
        has: filters.category,
      };
    }

    return await prisma.project.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findProjectById(id) {
    return await prisma.project.findUnique({
      where: { id: parseInt(id) },
    });
  }

  async updateProject(id, projectData) {
    const data = {};

    if (projectData.title !== undefined) data.title = projectData.title;
    if (projectData.description !== undefined) data.description = projectData.description;
    if (projectData.category !== undefined) data.category = projectData.category;
    if (projectData.mainImage !== undefined) data.mainImage = projectData.mainImage;
    if (projectData.thumbnailImages !== undefined) data.thumbnailImages = projectData.thumbnailImages;
    if (projectData.keyFindings !== undefined) data.keyFindings = projectData.keyFindings;

    return await prisma.project.update({
      where: { id: parseInt(id) },
      data,
    });
  }

  async deleteProject(id) {
    return await prisma.project.delete({
      where: { id: parseInt(id) },
    });
  }

  async getProjectCount() {
    return await prisma.project.count();
  }

  async searchProjects(searchTerm) {
    return await prisma.project.findMany({
      where: {
        OR: [
          {
            title: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
        ],
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}

module.exports = new ProjectService();