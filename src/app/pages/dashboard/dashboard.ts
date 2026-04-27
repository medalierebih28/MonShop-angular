import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {

  totalProducts = 0;
  inStock = 0;
  outStock = 0;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    const products = this.productService.getAll();

    this.totalProducts = products.length;
    this.inStock = products.filter((p: any) => p.stock > 0).length;
    this.outStock = products.filter((p: any) => p.stock == 0).length;
  }
}