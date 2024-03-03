import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent {
  cartFlag:boolean = true;
  wishFlag:boolean = true;
  numOFCartItems:number = 0;
  numOFWishListItems:number = 0;
  isLoggedIn = false;
  constructor(
    public _AuthenticationService:AuthenticationService,
    private _CartService:CartService,
    private _WishlistService:WishlistService,
    ){}

  ngOnInit(): void {

    this._CartService.numOfCartItems.subscribe(
      (data)=>{
      this.numOFCartItems = data;
      this.cartFlag =false;
      console.log(data);
    }
      );

      this._WishlistService.numOfWishListItem.subscribe(
        (data)=>{
        this.numOFWishListItems = data 
        this.wishFlag =false;
        console.log(data);
      }
        );
    
    this._AuthenticationService.userLoginData.subscribe({
      next: (data) =>{
        if(data != null ){
          this.isLoggedIn=true;
        }
        else{
          this.isLoggedIn=false;
        }
      }
    });
  }

}
