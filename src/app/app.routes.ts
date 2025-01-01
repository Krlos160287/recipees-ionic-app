import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'recetas',
    loadComponent: () => import('./recipees/recipees.component').then( m => m.RecipeesComponent),
    canActivate: [AuthGuard]
  },
];
