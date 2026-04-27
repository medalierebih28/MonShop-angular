import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Signup } from './pages/signup/signup';
import { Profile } from './pages/profile/profile';
import { ProductList } from './pages/products/product-list/product-list';
import { ProductAdd } from './pages/products/product-add/product-add';
import { ProductEdit } from './pages/products/product-edit/product-edit';
import { ProductDetail } from './pages/products/product-detail/product-detail';
import { Dashboard } from './pages/dashboard/dashboard';
import { authGuard } from './guards/auth-guard';


export const routes: Routes = [

     { path: 'home', component: Home },
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },
  { path: 'profile', component: Profile, canActivate: [authGuard] },
{ path: 'products', component: ProductList, canActivate: [authGuard] },
{ path: 'add-product', component: ProductAdd, canActivate: [authGuard] },
{ path: 'edit-product/:id', component: ProductEdit, canActivate: [authGuard] },
{ path: 'product/:id', component: ProductDetail, canActivate: [authGuard] },
{ path: 'dashboard', component: Dashboard, canActivate: [authGuard] },

  { path: '', redirectTo: 'home', pathMatch: 'full' }
];
