require('dotenv').config();
const app = require('./src/app');
const prisma = require('./src/config/prisma');
const userService = require('./src/services/userService');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 5000;

// Create uploads directory
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Initialize admin user
const initializeAdmin = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const existingAdmin = await userService.findByEmail(adminEmail);

    if (!existingAdmin) {
      await userService.createUser(
        adminEmail,
        process.env.ADMIN_PASSWORD,
        'admin'
      );
      console.log('✅ Admin user created successfully');
    } else {
      console.log('✅ Admin user already exists');
    }
  } catch (error) {
    console.error('❌ Error initializing admin:', error);
  }
};

// Start server
const startServer = async () => {
  try {
    // Test database connection
    await prisma.$connect();
    console.log('✅ Database connected successfully');

    // Initialize admin
    await initializeAdmin();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📝 Environment: ${process.env.NODE_ENV}`);
      console.log(`🔗 API: http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    await prisma.$disconnect();
    process.exit(1);
  }
};

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

startServer();