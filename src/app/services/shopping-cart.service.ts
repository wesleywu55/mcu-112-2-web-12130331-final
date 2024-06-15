import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { ShoppingItem } from '../model/shopping-item';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  data: ShoppingItem[] = [];

  addProduct(product: Product): void {
    const item = this.data.find((x) => x.product.id === product.id);
    if (item) {
      item.count++;
    } else {
      const id = this.data.length === 0 ? 1 : Math.max(...this.data.map((item) => item.id)) + 1;
      this.data.push(new ShoppingItem({ id, product, count: 1 }));
    }
  }

  deleteProduct(id: number): void {
    const index = this.data.findIndex((x) => x.id === id);
    if (index !== -1) {
      this.data.splice(index, 1);
    }
  }

  clear(): void {
    this.data = [];
  }
}
