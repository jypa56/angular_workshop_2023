import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  @Input() productList!:any[]
  @Input() show!:boolean
  @Output() showChange :EventEmitter<boolean> = new EventEmitter<boolean>();
  data!:any[]
  
  constructor(
    private dataService: DataService,
    private router: Router,
    private modalService: ModalService
    ) {}
    
  // async ngOnInit() {
  //   await this.getData();
  // }

  // async getData() {
  //   console.log(this.productList);
  //   this.dataService.getData().subscribe(async (response) => {
  //     this.data = response.products
  //     this.productList = response.products
  //       console.log('data:',response);
  //     });
  // }
  
    ngOnChanges(changes: SimpleChanges) {
    if (changes['productList']) {
      console.log("cart",this.productList);
      
    }
  }


  calculateDiscount(product:any){
    return product.price - (product.price * (product.discountPercentage / 100));
  }

  calculateAmount(product:any){
    return (product.price - (product.price * (product.discountPercentage / 100)))*product.quantity;
  }

  calculateTotalAmount(){
    let total = 0;
    this.productList.forEach(product => {
      total+= this.calculateAmount(product)
    });
    return total;
  }

  back(){
    this.show = false;
    this.showChange.emit(this.show);
  }
}

