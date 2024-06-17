import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IOrderDetailForm } from '../interface/order-detail-form.interface';
import { IOrderForm } from '../interface/order-form.interface';
import { Product } from '../model/product';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CurrencyPipe, ReactiveFormsModule],
  templateUrl: './shopping-cart-page.component.html',
  styleUrl: './shopping-cart-page.component.css',
})
export class ShoppingCartComponent implements OnInit {
  readonly shoppingCartService = inject(ShoppingCartService);

  readonly form = new FormGroup<IOrderForm>({
    name: new FormControl<string | null>(null),
    address: new FormControl<string | null>(null),
    telephone: new FormControl<string | null>(null),
    details: new FormArray<FormGroup<IOrderDetailForm>>([]),
  });

  get details(): FormArray<FormGroup<IOrderDetailForm>> {
    return this.form.get('details') as FormArray<FormGroup<IOrderDetailForm>>;
  }

  ngOnInit(): void {
    this.setOrderDetail();
  }

  setOrderDetail() {
    for (const item of this.shoppingCartService.data) {
      const control = new FormGroup<IOrderDetailForm>({
        id: new FormControl<number>(item.id, { nonNullable: true }),
        product: new FormControl<Product>(item.product, { nonNullable: true }),
        count: new FormControl<number>(item.count, { nonNullable: true }),
        price: new FormControl<number>(item.product.price * item.count, { nonNullable: true }),
      });

      this.details.push(control);
    }
  }
}
