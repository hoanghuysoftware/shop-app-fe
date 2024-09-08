import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full', title: 'Hihi-Shop' },
  { path: 'register', component: RegisterComponent, title: 'Đăng ký' },
  {
    path: 'login',
    loadChildren: () =>
      import('./components/login/login.router').then((r) => r.LOGIN_ROUTES),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./components/home/home.router').then((b) => b.HOME_ROUTES),
  },
  {
    path: 'order',
    loadChildren: () =>
      import('./components/order/order.router').then((cx) => cx.ORDER_ROUTES),
  },
];
