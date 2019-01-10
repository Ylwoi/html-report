import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoadXLSXComponent } from './load-xlsx/load-xlsx.component';
import { TopSellersComponent } from './top-sellers/top-sellers.component';

@NgModule({
  declarations: [
    AppComponent,
    LoadXLSXComponent,
    TopSellersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
