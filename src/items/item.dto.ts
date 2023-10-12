import { IsString, Length, IsInt, Min, IsUrl } from 'class-validator';

export class CreateItemDto {
  @IsString()
  @Length(3, 32)
  readonly item_name: string;

  @IsInt()
  @Min(0)
  readonly price: number;

  @IsString()
  @Length(3, 32)
  readonly description: string;

  @IsUrl()
  readonly image_url: string;
}

export class UpdateItemDto {
  @IsString()
  readonly item_id: string;

  @IsInt()
  @Min(0)
  readonly price: number;

  @IsInt()
  @Min(0)
  readonly items_in_stock: number;
}
