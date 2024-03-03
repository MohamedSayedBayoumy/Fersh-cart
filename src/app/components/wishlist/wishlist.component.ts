import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent {
  WishListProductsIds:String[] = [];
  wishListId:string = '';
  productsQuantity:number[]=[];
  isloading:boolean= true;
  productPrice:number = 0;
  numberOfWishListtItem:number = 0;
  ProductList:any[]=[];
  NewProductList:any[]=[];
  constructor(
    private _WishlistService:WishlistService, 
    private _CartService:CartService,
    private toastr: ToastrService,
    ){}

  ngOnInit(): void {
    this.getUserWishList();
  }

  getUserWishList(){
    this._WishlistService.getLoggedUserWishList().subscribe({
      next:response =>{
        console.log(response);
        // this.cartId = response.data._id;
        this.productPrice = response.data.price;
        this.numberOfWishListtItem= response.count;
        this.ProductList = response.data;
        console.log(this.productsQuantity);
        this.isloading = false;
      },
      error: err =>{
        console.log(err);
        this.isloading = false;
      }
    });
  }

  addItemToCart(prductId:string){
    this._CartService.addProductToCart(prductId).subscribe({
      next: response =>{
        this._CartService.numOfCartItems.next(response.numOfCartItems);
        console.log(response);
        this.toastr.success('', 'Product added successfully to your cart',{
          timeOut: 3000,
          positionClass:'toast-bottom-right',
          progressBar: true,
          closeButton:true,
        });
        this.removeProductFromWishList(prductId);
      },
      error: err =>{
        console.log(err);
      }
    });
  }

  removeProductFromWishList(prductId:string){
    this._WishlistService.removeProductFromWishlist(prductId).subscribe({
      next: response =>{
        console.log(response);
        this.WishListProductsIds = response.data;
        console.log(this.WishListProductsIds);
        
        // this.getUserWishList();
        this.NewProductList = this.ProductList.filter((item:any) =>this.WishListProductsIds.includes(item._id))
        this.ProductList = this.NewProductList;
        
        this._WishlistService.numOfWishListItem.next(response.data.length);
        this.toastr.success('', 'Product removed successfully from your cart',{
          timeOut: 3000,
          positionClass:'toast-bottom-right',
          progressBar: true,
          closeButton:true,
        });
      },
      error: err=>{
        console.log(err);
        
      }
    });
  }
}
