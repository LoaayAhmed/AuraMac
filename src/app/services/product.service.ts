import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, of,switchMap } from 'rxjs';
export interface Product {
  id: number;
  title: string;
  imageUrl?: string;  
  category?: string;  
  description?: string;  
  price: number;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private baseUrl = 'http://localhost:3001/products';

  constructor(private http: HttpClient) {}
searchProductsByName(name: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}?name_like=${name}`);
  }
  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  getById(id: number): Observable<Product | null> {
    return this.http.get<Product[]>(`${this.baseUrl}?id=${id}`).pipe(
      map(products => products.length > 0 ? products[0] : null), // Extract first product or null
      catchError(error => {
        console.error('Error fetching product:', error);
        return of(null); // Return null on error
      })
    );
  }

  searchByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}?category=${category}`);
  }

  searchByTitle(title: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}?title_like=${title}`);
  }

addProduct(product: Product): Observable<Product> {
  return this.http.get<Product[]>(this.baseUrl).pipe(
    map(products => {
      const lastId = products.length > 0 ? Math.max(...products.map(p => +p.id)) : 0;
      return { ...product, id: (lastId + 1).toString() }; 
    }),
    switchMap(updatedProduct => this.http.post<Product>(this.baseUrl, updatedProduct))
  );
}

  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/${id}`, product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}