import { Injectable } from '@nestjs/common';

import { v4 } from 'uuid';

import { Cart } from '../models';
import { InjectRepository } from '@nestjs/typeorm';
import { Carts } from '../entity/Carts';
import { Repository } from 'typeorm';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Carts) private cartsRepository: Repository<Carts>,
  ) {}

  private userCarts: Record<string, Cart> = {};

  async findByUserId(userId: string): Promise<Carts> {
    return await this.cartsRepository.findOne({
      where: { user_id: userId },
    });
  }

  async createByUserId(userId: string) {
    return await this.cartsRepository.save({
      user_id: userId,
      items: [],
    });
  }

  async findOrCreateByUserId(userId: string): Promise<Carts> {
    const userCart = await this.findByUserId(userId);

    if (userCart) {
      return userCart;
    }

    return this.createByUserId(userId);
  }

  async updateByUserId(userId: string, { items }: Cart): Promise<Carts> {
    const { id, ...rest } = await this.findOrCreateByUserId(userId);

    return await this.cartsRepository.save({
      id,
      ...rest,
    });
  }

  removeByUserId(userId): void {
    this.userCarts[userId] = null;
  }
}
