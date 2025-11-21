// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const md5 = require('md5');

const prisma = new PrismaClient();

async function main() {
  await prisma.referer.upsert({
    where: { email: 'deivedlichela@gmail.com' },
    update: {},
    create: {
      nome: 'Deived Lichela',
      email: 'deivedlichela@gmail.com',
      senha: md5('123456')
    }
  });
  console.log('Admin criado!');
}

main().finally(() => prisma.$disconnect());