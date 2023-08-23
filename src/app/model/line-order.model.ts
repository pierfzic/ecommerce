import { Product } from './product';

export class LineOrder {
  product: Product;
  quantity: number;

  constructor(product: Product, quantity: number) {
    this.product = product;
    this.quantity = quantity;
  }
  get totalItem(): number {
    return this.quantity * (this.product.price ?? 0);
  }
}
