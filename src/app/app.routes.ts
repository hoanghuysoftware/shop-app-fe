import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full', title: 'Hihi-Shop' },
  { path: 'register', component: RegisterComponent, title: 'Đăng ký' },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.router').then((r) => r.LOGIN_ROUTES),
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.router').then((b) => b.HOME_ROUTES),
  },
  {
    path: 'order',
    loadChildren: () =>
      import('./order/order.router').then((cx) => cx.ORDER_ROUTES),
  },
];
