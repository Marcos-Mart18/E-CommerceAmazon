import { Injectable, inject } from '@angular/core';
import { Product } from '../../shared/models/product';
import { PRODUCTS } from '../../mock/products';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:3000/products';

  products: Product[]=PRODUCTS;

  getAll():Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl); 
  }

  getById(id:string): Observable<Product>{
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }
}
