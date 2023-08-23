import { Cart } from './cart.model';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ProductRepository } from './product.repository';
import { RestDataSource } from './rest.datasource';

@NgModule({
  imports: [HttpClientModule],
  providers: [
    ProductRepository,
    Cart,
    { provide: RestDataSource, useClass: RestDataSource },
  ],
})
export class ModelModule {}
