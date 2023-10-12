import {
  Post,
  Get,
  Put,
  Delete,
  Param,
  Controller,
  Body,
} from '@nestjs/common';
import { CreateCartDto, CartAddItemDto, CartRemoveItemDto } from './cart.dto';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  getAllcarts() {
    return this.cartService.getAllCarts();
  }

  @Get(':cartId')
  getCart(@Param('cartId') cartId: string) {
    return this.cartService.getCart(cartId);
  }

  @Get(':cartId/items')
  getCartItems(@Param('cartId') cartId: string) {
    return this.cartService.getCartItems(cartId);
  }

  @Post()
  createCart(@Body() createCartDto: CreateCartDto) {
    return this.cartService.createCart(createCartDto);
  }

  @Put('additem')
  addItem(@Body() cartAddItemDto: CartAddItemDto) {
    return this.cartService.addItem(cartAddItemDto);
  }

  @Put('removeitem')
  removeItem(@Body() cartRemoveItemDto: CartRemoveItemDto) {
    return this.cartService.removeItem(cartRemoveItemDto);
  }

  @Delete(':cartId')
  deleteCart(@Param('cartId') cartId: string) {
    return this.cartService.deleteCart(cartId);
  }
}
