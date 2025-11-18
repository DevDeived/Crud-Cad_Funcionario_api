// api/db.js  → Agora com Prisma (muito mais simples e poderoso)
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn'] : [],
})

export default prisma