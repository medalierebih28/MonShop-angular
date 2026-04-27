import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../services/product';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './product-edit.html',
  styleUrls: ['./product-edit.css']
})
export class ProductEdit implements OnInit {

  product: any = {
    id: null,
    name: '',
    price: null,
    stock: null
  };

  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const found = this.productService.getById(id);

    if (found) {
      this.product = { ...found };
    } else {
      alert('Produit introuvable');
      this.router.navigate(['/products']);
    }
  }

  updateProduct() {

    // validation
    if (!this.product.name || this.product.price <= 0) {
      this.errorMessage = 'Nom et prix valide sont obligatoires';
      return;
    }

    if (this.product.stock < 0) {
      this.errorMessage = 'Stock invalide';
      return;
    }

    // update
    this.productService.update(this.product);

    // redirection
    this.router.navigate(['/products']);
  }
}