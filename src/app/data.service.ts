import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'https://dummyjson.com/products';
  private productDataSubject = new BehaviorSubject<any>([]); // You can change the data type based on your needs
  productData$ = this.productDataSubject.asObservable();
  constructor(private http: HttpClient) { }

  getMockUpData(): Observable<any> {
    return this.http.get<any>('./assets/data.json');
  }

  getData(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getDataById(productId:any): Observable<any> {
    return this.http.get(this.apiUrl+'/'+productId);
  }

  setProductList(data: string) {
    console.log("data:",data);
    this.productDataSubject.next(data);
  }
}
