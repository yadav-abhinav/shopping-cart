import { DataSource } from 'typeorm';

import { ItemEntity } from '../entity/item.entity';

export const itemProviders = [
  {
    provide: 'ItemRepositoryToken',
    useFactory: (connection: DataSource) =>
      connection.getRepository(ItemEntity),
    inject: ['DbConnectionToken'],
  },
];
