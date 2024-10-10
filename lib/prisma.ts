// lib/prisma.ts

import { PrismaClient } from "@prisma/client";

declare global {
  // Permette di dichiarare variabili globali
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ["query"], // Opzionale: logga le query per il debug
  });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
