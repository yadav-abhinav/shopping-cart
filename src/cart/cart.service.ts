import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Cart, CartItem } from './cart.interface';
import { CartEntity } from 'src/entity/cart.entity';
import { CartAddItemDto, CartRemoveItemDto, CreateCartDto } from './cart.dto';
import * as _ from 'lodash';
import { Item } from 'src/items/item.interface';

@Injectable()
export class CartService {
  constructor(
    @Inject('CartRepositoryToken')
    private readonly cartRepository: Repository<Cart>,
    @Inject('ItemRepositoryToken')
    private readonly itemRepository: Repository<Item>,
  ) {}

  async getAllCarts(): Promise<Cart[]> {
    try {
      return await this.cartRepository.find();
    } catch (err) {
      return err;
    }
  }

  async getCart(cart_id: string): Promise<Cart> {
    try {
      const cart = await this.cartRepository.findOneBy({ cart_id });

      if (!cart) {
        throw new BadRequestException('Cart could not be found!');
      }

      return { ...cart };
    } catch (err) {
      return err;
    }
  }

  async getCartItems(cart_id: string): Promise<CartItem[]> {
    try {
      const cart = await this.cartRepository.findOneBy({ cart_id });

      if (!cart) {
        throw new BadRequestException('Cart could not be found!');
      }

      // const { id, name, image_url } = cart;

      return cart.items;
    } catch (err) {
      return err;
    }
  }

  async createCart(param: CreateCartDto) {
    try {
      const cart = new CartEntity();
      const uuid = uuidv4();

      cart.cart_id = uuid;
      cart.cart_name = param.cart_name;
      cart.items = [];
      cart.created_time = parseInt(String(Date.now() / 1000), 10);
      await this.cartRepository.save(cart);

      return {
        created: true,
        cart_id: uuid,
      };
    } catch (err) {
      return err;
    }
  }

  async addItem(param: CartAddItemDto) {
    try {
      const { cart_id, item_id, quantity } = param;
      const cart = await this.cartRepository.findOneBy({ cart_id });
      const item = await this.itemRepository.findOneBy({ item_id });

      if (!cart) {
        throw new BadRequestException('Cart not found!');
      }

      if (!item) {
        throw new BadRequestException('Item not found!');
      }

      const duplicatedItem = _.find(cart.items, { item_id });

      if (duplicatedItem) {
        duplicatedItem.quantity =
          parseInt(String(quantity)) +
          parseInt(String(duplicatedItem.quantity));
      } else {
        cart.items.push({ item_id, item, quantity });
      }

      await this.cartRepository.save(cart);

      return {
        added: true,
        cart_id,
      };
    } catch (err) {
      return err;
    }
  }

  async removeItem(param: CartRemoveItemDto) {
    try {
      const { cart_id, item_id } = param;
      const cart = await this.cartRepository.findOneBy({ cart_id });
      const item = await this.itemRepository.findOneBy({ item_id });

      if (!cart) {
        throw new BadRequestException('Cart not found!');
      }

      if (!item) {
        throw new BadRequestException('Item not found!');
      }

      const removeItem = _.find(cart.items, (cv) => cv.item_id === item_id);

      if (!removeItem) {
        throw new BadRequestException('Item not present in cart!');
      }

      _.remove(cart.items, (cv) => cv.item_id === item_id);

      await this.cartRepository.save(cart);

      return {
        removed: true,
        cart_id,
      };
    } catch (err) {
      return err;
    }
  }

  async deleteCart(cart_id: string) {
    try {
      const cart = await this.cartRepository.findOneBy({ cart_id });

      if (!cart) {
        throw new BadRequestException('Cart not found!');
      }

      await this.cartRepository.remove(cart);

      return {
        deleted: true,
        cart_id,
      };
    } catch (err) {
      return err;
    }
  }
}
