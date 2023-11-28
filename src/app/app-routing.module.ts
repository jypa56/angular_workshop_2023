import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { HeaderComponent } from './header/header.component';

const routes: Routes = [
  { path: '', component: HeaderComponent },
  { path: 'product-detail/:id', component: ProductDetailComponent },
  { path: 'cart', component: CartComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
