import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  // ManyToOne,
  // JoinColumn,
} from 'typeorm';
import { ItemEntity } from './item.entity';

@Entity()
export class CartEntity {
  @PrimaryGeneratedColumn('uuid')
  cart_id: string;

  @Column('text')
  cart_name: string;

  @Column('jsonb', { nullable: true })
  items: ItemEntity[];

  @Column()
  created_time: number;
}
