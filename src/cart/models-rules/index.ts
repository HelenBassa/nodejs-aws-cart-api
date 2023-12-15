import { Cart, CartItem } from '../models';
import { Carts } from '../entity/Carts';

/**
 * @param {Cart} cart
 * @returns {number}
 */
export function calculateCartTotal(cart: Cart): number {
  return cart
    ? cart.items.reduce(
        (acc: number, { product: { price }, count }: CartItem) => {
          return (acc += price * count);
        },
        0,
      )
    : 0;
}
