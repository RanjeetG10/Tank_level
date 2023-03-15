import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDeviceComponent } from './add-device/add-device.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigComponent } from './DeviceReport/config/config.component';
import { PanelComponent } from './DeviceReport/panel/panel.component';
import { ReportDashComponent } from './DeviceReport/report-dash/report-dash.component';

import { ReportsComponent } from './DeviceReport/reports/reports.component';
import { OrganisationComponent } from './organisation/organisation.component';
import { LoginComponent } from './Pages/login/login.component';

const routes: Routes = [
  {path :'dashboard', component: DashboardComponent ,
   children:[
    // {path :'', redirectTo:'Organisation', pathMatch:'full'} ,
    {path :'Organisation', component:OrganisationComponent } ,
    {path :'AddDevice', component: AddDeviceComponent} ,
    {path :'ReportDash', component: ReportDashComponent} ,
    {path :'Panel', component: PanelComponent} ,
    {path :'Reports', component: ReportsComponent} ,
    {path :'Config', component: ConfigComponent} ,
   ]
  },
  {path :'Login', component: LoginComponent} ,
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

