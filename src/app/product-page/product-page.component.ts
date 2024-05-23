import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, startWith, switchMap } from 'rxjs';
import { Product } from '../model/product';
import { ProductCardListComponent } from '../product-card-list/product-card-list.component';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [AsyncPipe, ProductCardListComponent],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css',
})
export class ProductPageComponent {
  router = inject(Router);

  private productService = inject(ProductService);

  private readonly refresh$ = new Subject<void>();

  readonly products$ = this.refresh$.pipe(
    startWith(undefined),
    switchMap(() => this.productService.getList())
  );

  onAdd(): void {
    const product = new Product({
      name: 'Z 產品',
      authors: ['作者A', '作者B', '作者C'],
      company: '博碩文化',
      isShow: true,
      imgUrl: 'https://api.fnkr.net/testimg/200x200/DDDDDD/999999/?text=img',
      price: 1580,
    });
    this.productService.add(product).subscribe(() => this.refresh$.next());
  }

  onEdit(product: Product): void {
    this.router.navigate(['product', 'form', product.id]);
  }

  onRemove({ id }: Product): void {
    this.productService.remove(id).subscribe(() => this.refresh$.next());
  }

  onView(product: Product): void {
    this.router.navigate(['product', 'view', product.id]);
  }
}
