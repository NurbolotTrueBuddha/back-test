require('dotenv').config();
import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  entities: ['dist/**/*.entity{.ts,.js}', 'dist/**/*.orm{.ts,.js}'],
  migrationsTableName: 'migrations_history',
  migrations: ['dist/migrations/*{.js,.ts}'],
  migrationsRun: true,
  synchronize: true,
});
