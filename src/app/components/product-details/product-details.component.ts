import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProductDetails } from 'src/app/interfaces/products';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from 'src/app/services/wishlist.service';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {
  myWishList:string[]=[];
  addtoWish:boolean = false;
  isloading:boolean = true;
  productId:string = '';
  productDetails:ProductDetails = {
    sold:0,
    images:[],
    subcategory:[],
    ratingsQuantity:0,
    _id:'',
    title:'',
    slug:'',
    description:'',
    quantity:0,
    price:0,
    imageCover:'',
    category:{ _id:'',name:'',slug:'',image:'',},
    brand:{ _id:'', name:'', slug:'',image:'',},
    ratingsAverage:  0,
    createdAt:       new Date(Date.now()),
    updatedAt:       new Date(Date.now()),
    __v:             0,
    reviews:         [],
    id:              '',
  }

  customOptions: OwlOptions = {
    loop: true,
    autoplay:false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 200,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  }
  constructor(
    private _ProductsService:ProductsService,
    private _ActivatedRoute:ActivatedRoute,
    private _CartService:CartService,
    private toastr: ToastrService,
    private _WishlistService:WishlistService
    ){}


  ngOnInit(): void {
    this.getProductId();
    this.getProductDetailsById();
    this.getUserWishList();
  }

  getProductId(){
    this._ActivatedRoute.params.subscribe(params =>{
      this.productId = params['id'];
      console.log(params);
    });
  }

  getProductDetailsById(){
    this._ProductsService.getproductDetailsById(this.productId).subscribe({
      
      next: (response) => {
        this.isloading = false;
        this.productDetails = response.data;
        console.log(this.productDetails);
      },
      error: (error) => {
        this.isloading = false;
        console.log(error);
      }
    });
  }

  addItemToCart(prductId:string){
    this._CartService.addProductToCart(prductId).subscribe({
      next: response =>{
        console.log(response);
        this._CartService.numOfCartItems.next(response.numOfCartItems);
        this.toastr.success('', 'Product added successfully to your cart',{
          timeOut: 3000,
          positionClass:'toast-bottom-right',
          progressBar: true,
          closeButton:true,
        });
      },
      error: err =>{
        console.log(err);
      }
    });
  }

  addProductToWishList(productId:string){
    this._WishlistService.addProductToWishList(productId).subscribe({
      next: response=>{
        console.log(response);
        this.myWishList = response.data;
        this._WishlistService.numOfWishListItem.next(response.data.length);
        this.toastr.success('', 'Product added successfully to your wish list',{
          timeOut: 3000,
          positionClass:'toast-bottom-right',
          progressBar: true,
          closeButton:true,
        });
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
        this.myWishList = response.data;
        // console.log(this.myWishList);
        
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

  getUserWishList(){
    this._WishlistService.getLoggedUserWishList().subscribe({
      next:response =>{
        console.log(response.count);
        this._WishlistService.numOfWishListItem.next(response.count);
        for(let i=0; i<response.data.length;i++){
          this.myWishList.push(response.data[i]._id);
        }
      },
      error: err =>{
        console.log(err);
      }
    });
  }


}
