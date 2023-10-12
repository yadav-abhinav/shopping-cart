import { IsString, Length, IsInt, Min } from 'class-validator';

export class CreateCartDto {
  @IsString()
  @Length(3, 32)
  readonly cart_name: string;
}

export class CartAddItemDto {
  @IsString()
  readonly cart_id: string;

  @IsString()
  readonly item_id: string;

  @IsInt()
  @Min(0)
  readonly quantity: number;
}

export class CartRemoveItemDto {
  @IsString()
  readonly cart_id: string;

  @IsString()
  readonly item_id: string;
}
