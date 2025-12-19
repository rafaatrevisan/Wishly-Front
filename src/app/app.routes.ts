import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.module')
      .then(m => m.DashboardModule)
  },
  {
    path: 'listas',
    loadChildren: () => import('./features/listas/listas.module')
      .then(m => m.ListasModule)
  },
  {
    path: 'produtos',
    loadChildren: () => import('./features/produtos/produtos.module')
      .then(m => m.ProdutosModule)
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];