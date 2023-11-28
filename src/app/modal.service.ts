import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ProductDetailComponent } from './product-detail/product-detail.component';


@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalRef!: NgbModalRef;

  constructor(private modalService: NgbModal) {}

  openModal(product: any): void {
    this.modalRef = this.modalService.open(ProductDetailComponent, { centered: true });
    this.modalRef.componentInstance.product = product;
  }

  closeModal(): void {
    this.modalRef.close();
  }
}
