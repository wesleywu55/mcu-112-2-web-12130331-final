import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IOrderDetailForm } from '../interface/order-detail-form.interface';
import { IOrderForm } from '../interface/order-form.interface';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './shopping-cart-page.component.html',
  styleUrl: './shopping-cart-page.component.css',
})
export class ShoppingCartComponent {
  readonly form = new FormGroup<IOrderForm>({
    name: new FormControl<string | null>(null),
    address: new FormControl<string | null>(null),
    telephone: new FormControl<string | null>(null),
    details: new FormArray<FormGroup<IOrderDetailForm>>([]),
  });
}
