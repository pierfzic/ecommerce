import { Injectable } from '@angular/core';
import { LineOrder } from './line-order.model';
import { Observable } from 'rxjs';
import { Ordine } from './ordine';
import { Product } from './product';
import { RestDataSource } from './rest.datasource';

@Injectable()
export class Model {
  private products: Product[];
  private locator = (p: Product, id?: number) => p.id == id;

  constructor(private dataSource: RestDataSource) {
    this.products = new Array<Product>();
    // this.dataSource.getData().forEach(p => this.products.push(p));
    //this.dataSource.getData().subscribe((data) => (this.products = data));
    this.dataSource
      .getData()
      .subscribe((data) => data.forEach((p: Product) => this.products.push(p)));
  }

  getProducts(): Product[] {
    // console.log('sono in Model.getProducts()');
    // console.log(this.products);
    return this.products;
  }

  getProduct(id: number): Product | undefined {
    return this.products.find((p) => this.locator(p, id));
  }

  saveProduct(product: Product) {
    if (product.id == 0 || product.id == null) {
      this.dataSource
        .saveProduct(product)
        .subscribe((p) => this.products.push(p));
    } else {
      this.dataSource.updateProduct(product).subscribe((p) => {
        let index = this.products.findIndex((item) => this.locator(item, p.id));
        this.products.splice(index, 1, p);
      });
    }
  }

  deleteProduct(id: number) {
    this.dataSource.deleteProduct(id).subscribe(() => {
      let index = this.products.findIndex((p) => this.locator(p, id));
      if (index > -1) {
        this.products.splice(index, 1);
      }
    });
  }

  saveOrders(order: Ordine) {
    this.dataSource.saveOrder(order).subscribe((order) => {
      console.log('***ORDINE EFFETTUATO***');
      console.log(order);
    });
  }

  getOrders(): Observable<Ordine> {
    /* console.log('sono in getOrders in repository.model');
    let lista: Ordine = new Ordine('Gino', 'Via Arancio 14');
    this.dataSource.getOrder().subscribe((data) => {
      lista = data;
      console.log(data);
    });
    console.log('lista:');
    console.log(lista);
    return lista; */
    return this.dataSource.getOrder();
  }
}
