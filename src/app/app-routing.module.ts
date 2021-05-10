import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './guards/authentication.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ManageWidgetsComponent } from './manage-widgets/manage-widgets.component';
import { WidgetsComponent } from './widgets/widgets.component';

const routes: Routes = [
  { path: '', 
    component: HomeComponent,
    canActivate: [AuthenticationGuard],
    children: [
      { path: '', component: WidgetsComponent },
      { path: 'manage-widgets', component: ManageWidgetsComponent }
    ] 
  },
  { path: 'login', component: LoginComponent },
  { path: '**',   redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
