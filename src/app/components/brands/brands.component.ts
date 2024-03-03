import { Component } from '@angular/core';
import { Brand, Product } from 'src/app/interfaces/products';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss'],
})
export class BrandsComponent {
  isloading: boolean = true;
  brands: Brand[] = [];

  constructor(private _ProductsService: ProductsService) {}

  ngOnInit(): void {
    this.showAllBrands();
  }

  showAllBrands() {
    this._ProductsService.getAllBrands().subscribe({
      next: (response) => {
        this.isloading = false;

        this.brands = response.data.splice(0, 20);
      },
      error: (error) => {
        console.log(error);
        this.isloading = false;
      },
    });
  }
}
