import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { ShortItem, Item } from './item.interface';
import { ItemEntity } from '../entity/item.entity';
import { CreateItemDto, UpdateItemDto } from './item.dto';

@Injectable()
export class ItemService {
  constructor(
    @Inject('ItemRepositoryToken')
    private readonly itemRepository: Repository<Item>,
  ) {}

  async getAllItems(): Promise<Item[]> {
    try {
      return await this.itemRepository.find();
    } catch (err) {
      return err;
    }
  }

  async getItem(item_id: string): Promise<ShortItem> {
    try {
      const item = await this.itemRepository.findOneBy({ item_id });

      if (!item) {
        throw new BadRequestException('Product could not be found!');
      }

      const { item_name, price, image_url } = item;

      return { item_name, price, image_url };
    } catch (err) {
      return err;
    }
  }

  async createItem(param: CreateItemDto) {
    try {
      const item = new ItemEntity();
      const uuid = uuidv4();

      item.item_id = uuid;
      item.item_name = param.item_name;
      item.price = param.price;
      item.description = param.description;
      item.image_url = param.image_url;

      await this.itemRepository.save(item);

      return {
        created: true,
        item_id: uuid,
      };
    } catch (err) {
      return err;
    }
  }

  async updateItem(param: UpdateItemDto) {
    try {
      const { item_id, price } = param;
      const item = await this.itemRepository.findOneBy({ item_id });

      if (!item) {
        throw new BadRequestException('Product could not be found!');
      }

      item.price = price;

      await this.itemRepository.save(item);

      return;
    } catch (err) {
      return err;
    }
  }

  async deleteItem(item_id: string) {
    try {
      const item = await this.itemRepository.findOneBy({ item_id });

      if (!item) {
        throw new BadRequestException('Product could not be found!');
      }

      await this.itemRepository.remove(item);

      return;
    } catch (err) {
      return err;
    }
  }
}
