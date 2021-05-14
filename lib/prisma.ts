import { PrismaClient } from "@prisma/client";

interface CustomNodeJsGlobal extends NodeJS.Global {
    prisma: PrismaClient
}
// Prevent multiple instances of prisma client

declare const global: CustomNodeJsGlobal;

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === "development") global.prisma = prisma;

export default prisma;

