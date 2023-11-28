import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { ModalService } from '../modal.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  @Input() show!:boolean 
  @Input() id!:any
  @Input() product!:any
  buyForm!:FormGroup
  constructor(private route: ActivatedRoute,
    private dataService: DataService,
    private modalService: ModalService,
    private router: Router) 
    { 
      this.buyForm = new FormGroup({
        quantity: new FormControl('',[Validators.required, Validators.min(1), Validators.max(100)])
      });
    }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const productId = params.get('id');
      this.getProductDetails(productId);
    });
  
  }


 async getProductDetails(productId: any) {
    this.dataService.getDataById(productId).subscribe(async (response) => {
      this.product = response
    });
  }

  calculateAmount(procuct:any){
    return procuct.price - (procuct.price * (procuct.discountPercentage / 100));
  }

  closeModal(){
    this.modalService.closeModal();
  }

  addToCart(){
    if(this.buyForm.get('quantity')?.valid){
      const productList:any = {
        product: this.product,
        quantity: this.buyForm.get('quantity')?.value
      }
      console.log("productList: ",productList);
      this.dataService.setProductList(productList);
      console.log("productList: ",productList);
    }
  }

  buy(){
    if(this.buyForm.get('quantity')?.valid){
      const productList = {
        product: this.product,
        quantity: this.buyForm.get('quantity')?.value
      }
      console.log("productList: ",productList);
    }
  }

  back(){
    this.router.navigate(['']);
  }
}
