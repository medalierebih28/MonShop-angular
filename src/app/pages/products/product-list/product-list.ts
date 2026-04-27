import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css']
})
export class ProductList implements OnInit {

  products: any[] = [];
  filteredProducts: any[] = [];

  searchText: string = '';
  filter: string = 'all';

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.products = this.productService.getAll();
    this.filteredProducts = [...this.products]; // IMPORTANT
  }

  // 🔍 SEARCH + FILTER
  applyFilter() {
    this.filteredProducts = this.products.filter((p: any) => {

      // sécurité (évite crash)
      const name = p.name ? p.name.toLowerCase() : '';

      // recherche
      const matchSearch = name.includes(this.searchText.toLowerCase());

      // filtre
      let matchFilter = true;

      if (this.filter === 'inStock') {
        matchFilter = p.stock > 0;
      } else if (this.filter === 'outStock') {
        matchFilter = p.stock === 0;
      }

      return matchSearch && matchFilter;
    });
  }

  deleteProduct(id: number) {
    this.productService.delete(id);
    this.products = this.productService.getAll();
    this.applyFilter(); // IMPORTANT
  }
}