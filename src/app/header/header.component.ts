import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  cartList!:any;
  sharedService: any;
  productData: any=[];
  showCart:boolean=false;
  showProducts: boolean= true;
  constructor(private dataService: DataService,
    private router: Router) {}

  ngOnInit() {
    this.productData= []
    // this.dataService.productData$.subscribe((data: any) => {
    //   this.productData = data;
    // });
  }
  addToCart(product:any){  
    let duplicate = false;
    this.productData.forEach((cart: any) => {
      if(product.id==cart.id){
        cart.quantity=cart.quantity+product.quantity;
        duplicate = true;
      }
    });
    if(duplicate==false){
      this.productData.push(product);
    }
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes['cartList']) {
  //     this.productData.push(this.cartList);
  //   }
  // }

  cart(){
    this.showCart = true;
    this.showProducts = false;
  }

  closeCart(){
    this.showCart = false;
    this.showProducts = true;
  }

}
