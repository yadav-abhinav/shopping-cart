import { DataSource } from 'typeorm';
import { CartEntity } from '../entity/cart.entity';

export const cartProviders = [
  {
    provide: 'CartRepositoryToken',
    useFactory: (connection: DataSource) =>
      connection.getRepository(CartEntity),
    inject: ['DbConnectionToken', 'ItemRepositoryToken'],
  },
];
