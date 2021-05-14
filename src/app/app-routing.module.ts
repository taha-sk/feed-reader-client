import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddWidgetComponent } from './add-widget/add-widget.component';
import { DeleteWidgetComponent } from './delete-widget/delete-widget.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { AuthorizationGuard } from './guards/authorization.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ManageWidgetsComponent } from './manage-widgets/manage-widgets.component';
import { WidgetListComponent } from './widget-list/widget-list.component';
import { WidgetsComponent } from './widgets/widgets.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', 
    component: HomeComponent,
    canActivate: [AuthenticationGuard],
    children: [
      { path: 'manage-widgets', 
        component: ManageWidgetsComponent,
        canActivate: [AuthorizationGuard],
        children: [
          { path: 'add-widget', component: AddWidgetComponent },
          { path: 'delete-widget/:id', component: DeleteWidgetComponent },
          { path: '', component: WidgetListComponent }
        ] 
       },
       { path: '', component: WidgetsComponent }
    ] 
  },
  { path: '**',   redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
