import { PrismaClient } from '@prisma/client';
const globalForPrisma = global;

/** @type {import('@prisma/client').PrismaClient} */
export const db = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db;
}
