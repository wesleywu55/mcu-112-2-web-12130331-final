import { Routes } from '@angular/router';
import { ProductDetailPageComponent } from './product-detail-page/product-detail-page.component';
import { ProductFormPageComponent } from './product-form-page/product-form-page.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { productResolver } from './resolver/product.resolver';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'products' },
  { path: 'products', component: ProductPageComponent },
  { path: 'product/view/:id', component: ProductDetailPageComponent, resolve: { product: productResolver } },
  { path: 'product/form/:id', component: ProductFormPageComponent, resolve: { product: productResolver } },
  { path: 'shopping-cart', component: ShoppingCartComponent },
];
