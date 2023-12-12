import 'reflect-metadata';
import { DataSource } from 'typeorm';
// import { Post } from './entity/Post';
// import { Category } from './entity/Category';
import 'dotenv/config';
import * as process from 'process';
import { Carts } from './entity/Carts';
import { CartItems } from './entity/CartItems';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_URL ?? 'localhost',
  port: Number(process.env.DB_PORT) ?? 5432,
  username: process.env.DB_USER ?? 'test',
  password: process.env.DB_PASSWORD ?? 'test',
  database: process.env.DB_DATABASE ?? 'test',
  synchronize: true,
  logging: true,
  entities: [Carts, CartItems],
  subscribers: [],
  migrations: [],
});
