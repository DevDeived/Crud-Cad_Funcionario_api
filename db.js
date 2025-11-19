// api/db.js
import { PrismaClient } from "@prisma/client";

let prisma;

if (process.env.NODE_ENV === "production") {
  // NO RENDER: uma única instância global
  prisma = global.prisma || new PrismaClient();
  if (!global.prisma) global.prisma = prisma;
} else {
  // Local: com hot reload
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

// Garante que a conexão fecha quando o servidor cai
process.on("beforeExit", async () => {
  await prisma?.$disconnect();
});

export default prisma;