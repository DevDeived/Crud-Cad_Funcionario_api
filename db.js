// api/db.js → versão que aceita QUALQUER import (default ou named)
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Exporta das duas formas → nunca mais dá erro de import
export const db = prisma
export default prisma

// Conexão
prisma.$connect()
  .then(() => console.log("Prisma conectado com sucesso!"))
  .catch(err => console.error("Erro no Prisma:", err))