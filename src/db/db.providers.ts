import { DataSource } from 'typeorm';

import { ItemEntity } from '../entity/item.entity';
// import { OrderEntity } from '../entity/order.entity';
// import { UserEntity } from '../entity/user.entity';
import { CartEntity } from 'src/entity/cart.entity';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  database: 'pgdb',
  entities: [ItemEntity, CartEntity],
  synchronize: true,
});

export const dbProvider = {
  provide: 'DbConnectionToken',
  useFactory: async () => await AppDataSource.initialize(),
};
