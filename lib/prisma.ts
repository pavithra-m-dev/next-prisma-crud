// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

// TypeScript global augmentation to allow prisma on global
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Use the existing global prisma in development or create a new PrismaClient
export const prisma: PrismaClient =
  global.prisma ||
  new PrismaClient({
    log: ['query', 'info', 'warn'], // optional: helps debug queries
  });

// Save the client to the global object in development to prevent multiple instances
if (process.env.NODE_ENV !== 'production') global.prisma = prisma;
