import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { FormGroup,FormControl,FormBuilder, Validators } from '@angular/forms';
import { ModalService } from '../modal.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  @Input() show!:boolean
  @Output() productList: EventEmitter<any> = new EventEmitter<any>();
  products!:any[]
  data:any[]=[]
  searchQuery!:any
  searchForm: FormGroup;
  buyForm: FormGroup;
  productId: any;
  showDetail: boolean = false;
  selected: any;
  quantity!:any
  constructor(
    private dataService: DataService,
    private router: Router,
    private modalService: ModalService
    ) {
      this.searchForm = new FormGroup({
        search: new FormControl('')
      });

      this.buyForm = new FormGroup({
        quantity: new FormControl('',[Validators.required, Validators.min(1), Validators.max(100)])
      });
    }

  async ngOnInit() {
    await this.getData();
  }

  async getData() {
    this.dataService.getData().subscribe(async (response) => {
  
      response.products.forEach((product: any) => {
        product = {
          ...product,
          quantity:0
        }
        console.log('product',product);
        
        this.data?.push(product);
      });
      this.products = this.data
      console.log('this.products',this.products);
      
      });

      // this.dataService.getMockUpData().subscribe(async (response) => {
      //   this.data = response.products
      //   this.products = this.data
      //   });
  }

  calculateAmount(procuct:any){
    return procuct.price - (procuct.price * (procuct.discountPercentage / 100));
  }

  searchProducts(): any[] {
    this.searchQuery = this.searchForm.get('search')?.value;
    if(this.searchQuery){
      this.products=[];
      this.data.filter((product) => {
        if(product.title.toLowerCase().includes(this.searchQuery.toLowerCase())||
        product.category.toLowerCase().includes(this.searchQuery.toLowerCase())||
        product.brand.toLowerCase().includes(this.searchQuery.toLowerCase())||
        product.description.toLowerCase().includes(this.searchQuery.toLowerCase())){
          this.products.push(product)
        }      
      });
    }else{
      this.products=this.data
    }
    return this.products;
  }
  

  productDetail(product:any){
    this.showDetail = true;
    this.selected = product
    console.log("/product-detail/"+product.id);
    this.router.navigate(['/product-detail', product.id]);
  }

  addToCart(product:any){
    if(product.quantity>0&&product.quantity<=product.stock){
      this.productList.emit (product);
      console.log("productList: ",this.productList);
      alert('Add to cart already!');
    }else{
      alert('Invalid data!');
    }
  }
}
