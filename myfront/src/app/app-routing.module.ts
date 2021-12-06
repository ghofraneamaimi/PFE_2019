import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UploadCsvComponent } from './client/upload-csv/upload-csv.component';
import { ConsultAccountComponent } from './client/consult-account/consult-account.component';
import { ConsultCsvComponent } from './admin/consult-csv/consult-csv.component';
import { DownloadCsvComponent } from './admin/download-csv/download-csv.component';
import { DownloadDashboardComponent } from './client/download-dashboard/download-dashboard.component';
import { UploadDashboardComponent } from './admin/upload-dashboard/upload-dashboard.component';
import { ClientsComponent } from './admin/clients/clients.component';
import { PushDataComponent } from './admin/push-data/push-data.component';
import { AuthGuard } from './_guards/auth.guard';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    //canActivate: [AuthGuard]
},
  {
        path: 'home',
        component: HomeComponent,
        //canActivate: [AuthGuard]
    },
     {
        path: 'login',
        component: LoginComponent
    },
    {
      path: 'pushdata',
      component: PushDataComponent,
     // canActivate: [AuthGuard]
  },
    {
      path: 'CRUD',
      component: ClientsComponent,
      //canActivate: [AuthGuard]
  },
    {
      path: 'Dashboards',
      component: DownloadDashboardComponent,
      //canActivate: [AuthGuard]
  },
  {
    path: 'Csvs',
    component: UploadCsvComponent,
    //canActivate: [AuthGuard]
}, {
  path: 'info',
  component: ConsultAccountComponent,
 // canActivate: [AuthGuard]
},
{
  path: 'csvadmin',
  component: ConsultCsvComponent,
  //canActivate: [AuthGuard]
},
{
  path: 'csvDownloadAdmin',
  component: DownloadCsvComponent,

  //canActivate: [AuthGuard]
},
{
  path: 'uploaddashboard',
  component: UploadDashboardComponent,
  //canActivate: [AuthGuard]
},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
