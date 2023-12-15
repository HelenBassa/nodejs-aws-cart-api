import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Carts } from '../entity/Carts';

@Entity()
export class CartItems {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Carts, (cart) => cart.id)
  cart_id: string;

  @Column({ type: 'uuid', nullable: false })
  product_id: string;

  @Column({ type: 'integer', nullable: false })
  count: number;
}
