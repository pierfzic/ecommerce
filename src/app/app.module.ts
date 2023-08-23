import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { REST_URL, RestDataSource } from './model/rest.datasource';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CarrelloComponent } from './carrello/carrello.component';
import { ChipModule } from 'primeng/chip';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ContatoreComponent } from './contatore/contatore.component';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { DialogModule } from 'primeng/dialog';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Model } from './model/repository.model';
import { NgModule } from '@angular/core';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PasswordModule } from 'primeng/password';
import { ProductRepository } from './model/product.repository';
import { SidebarModule } from 'primeng/sidebar';
import { SimpleDataSource } from './model/static.datasource';
import { StateService } from './state.service';
import { TableModule } from 'primeng/table';
import { TableProductComponent } from './table-product/table-product.component';
import { TooltipModule } from 'primeng/tooltip';
import { RiepilogoOrdineComponent } from './riepilogo-ordine/riepilogo-ordine.component';

@NgModule({
  declarations: [
    AppComponent,
    TableProductComponent,
    DetailProductComponent,
    ContatoreComponent,
    CarrelloComponent,
    RiepilogoOrdineComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TableModule,
    ButtonModule,
    PasswordModule,
    SidebarModule,
    DialogModule,
    BrowserAnimationsModule,
    AvatarModule,
    BadgeModule,
    ChipModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CardModule,
    TooltipModule,
  ],
  providers: [
    Model,
    RestDataSource,
    {
      provide: REST_URL,
      useValue: `http://${location.hostname}:3500`,
    },
    StateService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
