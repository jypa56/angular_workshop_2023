import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { HeaderComponent } from './header/header.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CartComponent } from './cart/cart.component';
import { ModalService} from './modal.service'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from './data.service';
@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    HeaderComponent,
    ProductDetailComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [ModalService,DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
