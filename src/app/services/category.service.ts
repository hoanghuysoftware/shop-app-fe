import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = 'http://localhost:8080/api/v1/categories';

  constructor(private http: HttpClient) {}

  getAllCategories() {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }
}
