import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { authGuard } from './guards/auth.guard';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ShipingAddressComponent } from './components/shiping-address/shiping-address.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    canActivate: [authGuard],
    component: HomeComponent,
    title: 'Home',
  },
  {
    path: 'brands',
    canActivate: [authGuard],
    component: BrandsComponent,
    title: 'Brands',
  },
  {
    path: 'allorders',
    canActivate: [authGuard],
    component: AllordersComponent,
    title: 'All Orders',
  },
  {
    path: 'shippingAddress/:id',
    canActivate: [authGuard],
    component: ShipingAddressComponent,
    title: 'Shipping Details',
  },
  {
    path: 'productDetails/:id',
    canActivate: [authGuard],
    component: ProductDetailsComponent,
    title: 'productDetails',
  },
  {
    path: 'cart',
    canActivate: [authGuard],
    component: CartComponent,
    title: 'Cart',
  },
  {
    path: 'wishlist',
    canActivate: [authGuard],
    component: WishlistComponent,
    title: 'My Wish List',
  },
  {
    path: 'products',
    canActivate: [authGuard],
    component: ProductsComponent,
    title: 'Products',
  },
  {
    path: 'categories',
    canActivate: [authGuard],
    component: CategoriesComponent,
    title: 'Categories',
  },
  { path: 'register', component: RegisterComponent, title: 'Register' },
  { path: 'login', component: LoginComponent, title: 'Login' },
  {
    path: 'forgetpassword',
    loadComponent: () =>
      import(
        './standalone-components/forget-password/forget-password.component'
      ).then((c) => c.ForgetPasswordComponent),
    title: 'forget Password',
  },
  { path: '**', component: NotfoundComponent, title: 'Not Found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
