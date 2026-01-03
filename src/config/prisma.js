const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

// Handle cleanup on application shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

module.exports = prisma;