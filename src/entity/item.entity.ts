import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class ItemEntity {
  @PrimaryColumn('uuid')
  item_id: string;

  @Column('text')
  item_name: string;

  @Column('text')
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column()
  image_url: string;
}
