import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDeviceComponent } from './add-device/add-device.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReportDashComponent } from './DeviceReport/report-dash/report-dash.component';
import { OrganisationComponent } from './organisation/organisation.component';

const routes: Routes = [
  {path :'dashboard', component: DashboardComponent ,
   children:[
    {path :'', redirectTo:'Organisation', pathMatch:'full'} ,
    {path :'Organisation', component:OrganisationComponent } ,
    {path :'AddDevice', component: AddDeviceComponent} ,
    {path :'ReportDash', component: ReportDashComponent} ,
    
   ]
  },

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

