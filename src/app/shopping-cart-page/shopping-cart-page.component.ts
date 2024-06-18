import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
    name: new FormControl<string | null>(null, { validators: [Validators.required] }),
    address: new FormControl<string | null>(null, { validators: [Validators.required] }),
    telephone: new FormControl<string | null>(null, { validators: [Validators.required] }),
    details: new FormArray<FormGroup<IOrderDetailForm>>([]),
  });

  get name(): FormControl<string | undefined> {
    return this.form.get('name') as FormControl<string | undefined>;
  }

  get address(): FormControl<string | undefined> {
    return this.form.get('address') as FormControl<string | undefined>;
  }

  get telephone(): FormControl<string | undefined> {
    return this.form.get('telephone') as FormControl<string | undefined>;
  }

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
  onDelete(index: number, id: number | undefined): void {
    this.details.removeAt(index);
    this.shoppingCartService.deleteProduct(id!);
  }
  onSave(): void {
    console.log('Save');
  }
}
