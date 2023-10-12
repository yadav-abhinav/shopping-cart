import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ItemsModule } from './items/item.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [ItemsModule, CartModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
