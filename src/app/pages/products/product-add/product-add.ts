import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../services/product';

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './product-add.html',
  styleUrls: ['./product-add.css']
})
export class ProductAdd {

  name: string = '';
  price: number | null = null;
  stock: number | null = null;

  imageBase64: string = '';

  errorMessage: string = '';

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  // 📸 Upload image
  onFileSelected(event: any) {
    const file = event.target.files[0];

    if (!file) return;

    // vérifier type image
    if (!file.type.startsWith('image/')) {
      this.errorMessage = 'Veuillez choisir une image valide';
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      this.imageBase64 = reader.result as string;
    };

    reader.readAsDataURL(file);
  }

  // ➕ Ajouter produit
  addProduct() {

    // validation
    if (!this.name || this.price === null || this.price <= 0) {
      this.errorMessage = 'Nom et prix valides sont obligatoires';
      return;
    }

    if (this.stock === null || this.stock < 0) {
      this.errorMessage = 'Stock invalide';
      return;
    }

    // ajout produit
    this.productService.add({
      name: this.name,
      price: this.price,
      stock: this.stock,
      image: this.imageBase64 // 👈 image incluse
    });

    // reset + redirection
    this.router.navigate(['/products']);
  }
}