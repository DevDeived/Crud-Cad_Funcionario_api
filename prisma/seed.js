// prisma/seed.js
import { PrismaClient } from '@prisma/client';
import md5 from 'md5';

const prisma = new PrismaClient();

async function main() {
  await prisma.referer.upsert({
    where: { email: 'deivedlichela@gmail.com' },
    update: {},
    create: {
      nome: 'Deived Lichela',
      email: 'deivedlichela@gmail.com',
      senha: md5('123456'),
    },
  });
  console.log('Admin Deived criado com sucesso!');
}

main()
  .catch((e) => {
    console.error('Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });