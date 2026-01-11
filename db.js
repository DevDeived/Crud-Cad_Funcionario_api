import { PrismaClient } from "@prisma/client";

let prisma;

if (process.env.NODE_ENV === "production") {
  prisma = global.prisma || new PrismaClient();
  if (!global.prisma) global.prisma = prisma;
} else {
  prisma = global.prisma || new PrismaClient();
  global.prisma = prisma;
}

process.on("beforeExit", async () => {
  await prisma.$disconnect();
});

export default prisma;
