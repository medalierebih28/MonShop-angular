import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private storageKey = 'products';

  getAll() {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  add(product: any) {
    const products = this.getAll();
    product.id = Date.now();
    products.push(product);
    localStorage.setItem(this.storageKey, JSON.stringify(products));
  }

  getById(id: number) {
    return this.getAll().find((p: any) => p.id == id);
  }

  update(updatedProduct: any) {
    let products = this.getAll();
    products = products.map((p: any) =>
      p.id == updatedProduct.id ? updatedProduct : p
    );
    localStorage.setItem(this.storageKey, JSON.stringify(products));
  }

  delete(id: number) {
    const products = this.getAll().filter((p: any) => p.id != id);
    localStorage.setItem(this.storageKey, JSON.stringify(products));
  }
}