import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Pages/login/login.component';
import { NavbarComponent } from './Pages/navbar/navbar.component';
import { SidebarComponent } from './Pages/sidebar/sidebar.component';
import { FooterComponent } from './Pages/footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddDeviceComponent } from './add-device/add-device.component';
import { OrganisationComponent } from './organisation/organisation.component';
import { PanelComponent } from './DeviceReport/panel/panel.component';
import { ReportsComponent } from './DeviceReport/reports/reports.component';
import { ConfigComponent } from './DeviceReport/config/config.component';
import { WaterbalanceComponent } from './DeviceReport/waterbalance/waterbalance.component';
import { ReportDashComponent } from './DeviceReport/report-dash/report-dash.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    DashboardComponent,
    AddDeviceComponent,
    OrganisationComponent,
    PanelComponent,
    ReportsComponent,
    ConfigComponent,
    WaterbalanceComponent,
    ReportDashComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
