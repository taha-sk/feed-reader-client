import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { WidgetsComponent } from './widgets/widgets.component';
import { httpInterceptorProviders } from './interceptors';
import { ManageWidgetsComponent } from './manage-widgets/manage-widgets.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { WidgetDeckComponent } from './widget-deck/widget-deck.component';
import { WidgetListComponent } from './widget-list/widget-list.component';
import { AddWidgetComponent } from './add-widget/add-widget.component';
import { DeleteWidgetComponent } from './delete-widget/delete-widget.component';

@NgModule({ declarations: [
        AppComponent,
        LoginComponent,
        HomeComponent,
        NavBarComponent,
        WidgetsComponent,
        ManageWidgetsComponent,
        SearchBarComponent,
        WidgetDeckComponent,
        WidgetListComponent,
        AddWidgetComponent,
        DeleteWidgetComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        NgbModule,
        ReactiveFormsModule,
        BrowserAnimationsModule], providers: [
        httpInterceptorProviders,
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule { }
