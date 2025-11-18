import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const db = prisma

prisma.$connect()
  .then(() => console.log("Prisma conectado com sucesso!"))
  .catch(err => console.error("Erro no Prisma:", err))