import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/menu/la-terracotta',
    pathMatch: 'full'
  },
  {
    path: 'menu/:slug',
    loadComponent: () => import('./features/menu/components/menu-view/menu-view.component').then(m => m.MenuViewComponent)
  },
  {
    path: 'admin',
    loadComponent: () => import('./features/admin/components/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: '**',
    redirectTo: '/menu/la-terracotta'
  }
];
