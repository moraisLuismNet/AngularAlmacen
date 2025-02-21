import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './inicio/login/login.component';
import { NotFoundComponent } from './inicio/not-found/not-found.component';

const routes: Routes = [{ path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'almacen',
    loadChildren: () => import('./almacen/almacen.module').then((m) => m.AlmacenModule)
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
