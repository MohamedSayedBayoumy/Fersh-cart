import { Component } from '@angular/core';
import { OrderItemsDetails } from 'src/app/interfaces/order-dtails';
import { UserLoginData } from 'src/app/interfaces/user-data';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.scss']
})
export class AllordersComponent {
  isloading:boolean = true;
  products:any = '';
  allOrders:OrderItemsDetails []= [];
  cartProductItems:any = [];
  userLogin:UserLoginData = 
  {
  id: '', 
  name: '', 
  role: '', 
  iat: 0, 
  exp: 0
  };
  constructor(
    private _AuthenticationService:AuthenticationService,
    private _OrdersService:OrdersService
    ){}

  ngOnInit(): void {
    this._AuthenticationService.userLoginData.subscribe((data) =>{
      if (data != null){
        this.userLogin = data;
      }
      console.log(this.userLogin);
    })
    this.getAllUserOrders();
  };

  getAllUserOrders(){
    this._OrdersService.getUserOrders(this.userLogin.id).subscribe({
      next: (response)=>{
        console.log(response);
        this.isloading=false;
        this.allOrders = response;
        for(let i=0 ; i< response.length;i++){
          this.cartProductItems.push(response[i].cartItems);
        }
        console.log(this.cartProductItems);
        for(let i=0 ; i<this.cartProductItems.lebgth;i++){
          for(let j=0; j< this.cartProductItems[i].length;j++){
            for(let x=0; x<this.cartProductItems[i][j].length;x++){
              console.log(this.cartProductItems[i][j][x].count);
              
            }
            
          }
        }

      },
      error: err=>{
        console.log(err);
        this.isloading=false;
      }
    });
  }
}
