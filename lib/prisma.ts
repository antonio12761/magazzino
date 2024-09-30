import { PrismaClient } from "@prisma/client";

// Se esiste già una variabile 'prisma' in 'global', la usiamo, altrimenti ne creiamo una nuova
const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;  // Assegna 'prisma' a 'global' solo in sviluppo
}

export default prisma;
