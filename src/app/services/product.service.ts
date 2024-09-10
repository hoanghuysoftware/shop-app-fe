import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiProduct = `http://localhost:8080/api/v1/products`;

  constructor(private http: HttpClient) {}

  getProducts(pages: number, limit: number): Observable<Product[]> {
    const params = new HttpParams()
      .set('page', pages.toString())
      .set('limit', limit.toString());
    return this.http.get<Product[]>(this.apiProduct, { params });
  }

  searchProduct(name: string) {
    return this.http.get<Product[]>(`${this.apiProduct}/search?name=${name}`);
  }
}
