import { DataSource } from 'typeorm';

const { env } = process;

export default new DataSource({
  type: 'postgres',
  host: env.PG_HOST,
  port: Number(env.PG_PORT),
  username: env.PG_ACCOUNT,
  password: env.PG_PASSWORD,
  database: env.PG_DATABASE,
  synchronize: Boolean(env.PG_SYNCHRONIZE),
  logging: Boolean(env.PG_LOGGING),
  entities: [env.PG_ENTITIES || ''],
});