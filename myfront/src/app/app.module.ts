import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { JwtInterceptor} from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { ConsultCsvComponent } from './admin/consult-csv/consult-csv.component';
import { DownloadCsvComponent } from './admin/download-csv/download-csv.component';
import { UploadDashboardComponent } from './admin/upload-dashboard/upload-dashboard.component';
import { ConsultAccountComponent } from './client/consult-account/consult-account.component';
import { DownloadDashboardComponent } from './client/download-dashboard/download-dashboard.component';
import { UploadCsvComponent } from './client/upload-csv/upload-csv.component';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { ClientComponent } from '../app/client/client.component';
import { ClientsComponent } from './admin/clients/clients.component';
import { PushDataComponent } from './admin/push-data/push-data.component';
import {FieldsetModule} from 'primeng/fieldset';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
//import { MatIconModule } from '@angular/material/icon';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AdminComponent,
    ClientComponent,
    ClientsComponent,
    ConsultCsvComponent,
    DownloadCsvComponent,
    UploadDashboardComponent,
    ConsultAccountComponent,
    DownloadDashboardComponent,
    UploadCsvComponent,
    PushDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    FieldsetModule,
    ButtonModule,
    CardModule,
    MDBBootstrapModule.forRoot()
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

],
  bootstrap: [AppComponent]
})
export class AppModule { }
