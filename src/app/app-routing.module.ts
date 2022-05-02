import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/general/page-not-found/page-not-found.component';
import { AuthLayoutComponent } from './components/layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './components/layout/main-layout/main-layout.component';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { NotAuthenticatedGuard } from './guards/not-authenticated.guard';

const routes: Routes = [

  {
		path: '',
		redirectTo: 'dashboard',
		pathMatch: 'full',
	},
  {
    path :'',
    component:MainLayoutComponent,
    children : [
      {
        path: 'dashboard',
				loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivateChild: [AuthenticatedGuard]
      },
      {
        path: 'stocks',
				loadChildren: () => import('./pages/stock-management/stock-management.module').then(m => m.StockManagementModule),
        canActivateChild: [AuthenticatedGuard]
      },
      {
        path: 'orders',
				loadChildren: () => import('./pages/orders/orders.module').then(m => m.OrdersModule),
        canActivateChild: [AuthenticatedGuard]
      },
      {
        path: 'users',
				loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule),
        canActivateChild: [AuthenticatedGuard]
      },
     
    ]
  },
  {
		path: 'auth',
		canLoad: [NotAuthenticatedGuard],
		component: AuthLayoutComponent,
		loadChildren: () => import('./core/auth/auth.module').then(m => m.AuthModule),
	},
	// Fallback route if none of the above is matched
	{
		path: '**',
		component: PageNotFoundComponent,
	},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

