import mysql from 'serverless-mysql';

// Reuse the client across dev hot reloads so old connections aren't leaked.
const globalForDb = globalThis;

export const connection =
  globalForDb.mysqlConnection ??
  mysql({
    config: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: Number(process.env.DB_PORT) || 3306,
    },
  });

if (process.env.NODE_ENV !== 'production') {
  globalForDb.mysqlConnection = connection;
}
