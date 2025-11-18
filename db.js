// api/db.js → versão compatível com seus controllers antigos
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Exporta como "db" para não precisar mudar nada nos controllers
export const db = prisma

// Opcional: teste de conexão
prisma.$connect()
  .then(() => console.log("Prisma conectado com sucesso!"))
  .catch(err => console.error("Erro no Prisma:", err))