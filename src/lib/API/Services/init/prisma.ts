import { neonConfig } from '@neondatabase/serverless';
import { PrismaClient, Prisma } from '@prisma/client';
import ws from 'ws';

// www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices
declare global {
  var prisma: PrismaClient | undefined; // eslint-disable-line
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'development') {
  prisma = new PrismaClient();
  global.prisma = prisma;
} else if (process.env.NODE_ENV === 'production') {
  // setup
  neonConfig.webSocketConstructor = ws;
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error('DATABASE_URL environment variable is not set');
  }

  // instantiate PrismaClient with the connection string directly
  prisma = new PrismaClient({
    datasources: {
      db: {
        url: connectionString,
      },
    },
    log: ['query', 'info', 'warn', 'error'],
  });
} else if (process.env.NODE_ENV === 'test') {
  const url = process.env.DATABASE_URL_TEST;

  if (!url) {
    throw new Error('DATABASE_URL_TEST environment variable is not set');
  }

  prisma = new PrismaClient({
    datasources: {
      db: {
        url,
      },
    },
  });
} else {
  throw new Error('NODE_ENV is not set or has an unexpected value');
}

export { Prisma };

export default prisma;
