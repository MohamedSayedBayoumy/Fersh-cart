import { Component } from '@angular/core';
import { Product } from 'src/app/interfaces/products';
import { ProductsService } from 'src/app/services/products.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  myWishList: string[] = [];
  flag: boolean = true;
  term: string = '';
  activepage1: boolean = true;
  isloading: boolean = true;
  productList: Product[] = [];
  productId: string[] = [];
  page1: Product[] = [];
  page2: Product[] = [];
  constructor(
    private _ProductsService: ProductsService,
    private _CartService: CartService,
    private toastr: ToastrService,
    private _WishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    this.displayAllProducts();
    this.getUserWishList();
  }

  displayAllProducts() {
    this._ProductsService.getAllProducts().subscribe({
      next: (response) => {
        this.isloading = false;
        this.page1 = response.data;
        this.page2 = this.page1.splice(0, 20);
        this.productList = this.page1;
      },
      error: (err) => {
        this.isloading = false;
        console.log(err);
      },
    });
  }

  getNextpage() {
    this.activepage1 = false;
    window.scrollTo(0, 0);
    this.productList = this.page2;
  }
  getPrevpage() {
    this.activepage1 = true;
    window.scrollTo(0, 0);
    this.productList = this.page1;
  }

  addItemToCart(prductId: string) {
    this._CartService.addProductToCart(prductId).subscribe({
      next: (response) => {
        this._CartService.numOfCartItems.next(response.numOfCartItems);
        console.log(response);
        this.toastr.success('', 'Product added successfully to your cart', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right',
          progressBar: true,
          closeButton: true,
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addProductToWishList(productId: string) {
    this._WishlistService.addProductToWishList(productId).subscribe({
      next: (response) => {
        console.log(response);
        this.myWishList = response.data;
        this._WishlistService.numOfWishListItem.next(response.data.length);
        this.toastr.success(
          '',
          'Product added successfully to your wish list',
          {
            timeOut: 3000,
            positionClass: 'toast-bottom-right',
            progressBar: true,
            closeButton: true,
          }
        );
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  removeProductFromWishList(prductId: string) {
    this._WishlistService.removeProductFromWishlist(prductId).subscribe({
      next: (response) => {
        console.log(response);
        this.myWishList = response.data;
        // console.log(this.myWishList);

        this._WishlistService.numOfWishListItem.next(response.data.length);
        this.toastr.success('', 'Product removed successfully from your cart', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right',
          progressBar: true,
          closeButton: true,
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getUserWishList() {
    this._WishlistService.getLoggedUserWishList().subscribe({
      next: (response) => {
        console.log(response.count);
        this._WishlistService.numOfWishListItem.next(response.count);
        for (let i = 0; i < response.data.length; i++) {
          this.myWishList.push(response.data[i]._id);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getUserCart() {
    this._CartService.getLoggedUserCart().subscribe({
      next: (response) => {
        this._CartService.numOfCartItems.next(response.numOfCartItems);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
