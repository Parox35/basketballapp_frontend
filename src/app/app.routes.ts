import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    { path: 'home', loadComponent: () => import('./components/home/home').then(m => m.Home), canActivate: [authGuard] },
    { path: 'register', loadComponent: () => import('./components/authentification/register/register').then(m => m.Register) },
    { path: 'login', loadComponent: () => import('./components/authentification/login/login').then(m => m.Login) },
    //{ path: '', loadComponent: () => import('./components/home/home').then(m => m.Home), canActivate: [authGuard] },
    { path: '**', redirectTo: 'login', pathMatch: 'full' }
];
