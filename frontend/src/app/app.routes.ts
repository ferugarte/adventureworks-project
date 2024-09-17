import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { ProductFormComponent } from './components/product/product-form/product-form.component';
import { AppLayoutComponent } from './components/layout/app-layout.component';  
import { ProductViewComponent } from './components/product/product-view/product-view.component'; 

export const routes: Routes = [
  { path: 'login', component: LoginComponent },  // Route for login screen

  {
    path: '',  // Base route, protected by the layout component (for authenticated users)
    component: AppLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },  // Route for the dashboard
      { path: 'products', component: ProductListComponent },  // Route for listing products
      { path: 'products/new', component: ProductFormComponent },  // Route for adding a new product
      { path: 'products/:id/edit', component: ProductFormComponent },  // Route for editing an existing product
      { path: 'products/:id/view', component: ProductViewComponent },  // Route for viewing product details
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },  // Redirect empty paths to the dashboard
    ]
  },

  { path: '**', redirectTo: 'login' }  // Redirect unknown paths to the login page
];
