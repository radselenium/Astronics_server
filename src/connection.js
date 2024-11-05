const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
require('dotenv').config();
async function checkDbConnection() {
    try {
      await prisma.$connect();
      console.log('Database connected successfully.');
    } catch (error) {
      console.error('Database connection failed:', error);
    } finally {
      await prisma.$disconnect();
    }
  }
  
checkDbConnection();
module.exports = prisma;
