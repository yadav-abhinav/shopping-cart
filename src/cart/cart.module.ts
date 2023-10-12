import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { DBModule } from 'src/db/db.module';
import { cartProviders } from './cart.providers';
import { ItemsModule } from 'src/items/item.module';
import { itemProviders } from 'src/items/item.providers';
import { ItemService } from 'src/items/item.service';

@Module({
  imports: [DBModule, ItemsModule],
  controllers: [CartController],
  providers: [...cartProviders, ...itemProviders, CartService, ItemService],
})
export class CartModule {}
