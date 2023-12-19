import { Module } from '@nestjs/common';

import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

import { AppController } from './app.controller';

import { CartModule } from './cart/cart.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';

import { Users } from './users/entity/Users';
import { Carts } from './cart/entity/Carts';
import { CartItems } from './cart/entity/CartItems';
import { Orders } from './order/entity/Order';

import 'dotenv/config';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: +process.env.DB_PORT ?? 5432,
  username: process.env.DB_USERNAME ?? 'test',
  password: process.env.DB_PASSWORD ?? 'test',
  database: process.env.DB_DATABASE_NAME ?? 'test',
  ssl: {
    rejectUnauthorized: false,
  },
  synchronize: true,
  logging: true,
  entities: [Carts, CartItems, Orders, Users],
  subscribers: [],
  migrations: [],
};
@Module({
  imports: [AuthModule, CartModule, OrderModule, TypeOrmModule.forRoot(config)],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
