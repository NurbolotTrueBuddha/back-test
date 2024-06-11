import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  url: process.env.URL,
  port: process.env.PORT,
  env: process.env.ENV,
  host: process.env.HOST,
  swagger: {
    path: process.env.DOCUMENTATION_PATH,
  },
  database: {
    pg: {
      type: process.env.DATABASE_DRIVER,
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      database: process.env.DATABASE,
      password: process.env.DATABASE_PASSWORD,
      synchronize: true,
      entities: ['dist/**/*.entity{.ts,.js}', 'dist/**/*.orm{.ts,.js}'],
      migrationsRun: true,
      migrationsTableName: 'migrations_history',
      migrations: ['dist/migrations/*{.js,.ts}'],
      cli: {
        migrationsDir: 'migrations',
      },
    },
  },
}));
